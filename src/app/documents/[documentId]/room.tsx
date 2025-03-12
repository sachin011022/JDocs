"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { getDocuments, getUsers } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
  color: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const userList = await getUsers();
        setUsers(userList);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users;
        if (text) {
          filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filterUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}

      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

function Loading() {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-white/50'>
      <div className='animate-spin rounded-full border-b-2 border-blue-500 size-7 mb-2' />
      <p className='text-blue-500'> Editor room loading...</p>
    </div>
  );
}
