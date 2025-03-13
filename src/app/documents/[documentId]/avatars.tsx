"use client";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import Image from "next/image";

const AVATAR_SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const user = useOthers();
  const currentUser = useSelf();

  if (user.length == 0) return null;

  return (
    <div className='flex items-center'>
      {currentUser && (
        <div className='relative ml-2'>
          <Avatar src={currentUser.info.avatar} name={"You"} />
        </div>
      )}
      <div className='flex'>
        {user.map(({ connectionId, info }) => {
          return (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          );
        })}
      </div>
    </div>
  );
};

interface AvatarProps {
  src: string;
  name: string;
}
const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      className='group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400'
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
    >
      <div className='opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-sm rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity'>
        {name}
      </div>
      <Image src={src} alt={name} className='size-full rounded-full' />
    </div>
  );
};
