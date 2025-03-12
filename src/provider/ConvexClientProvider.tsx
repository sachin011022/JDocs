"use client";

import { ClerkProvider, SignIn, useAuth } from "@clerk/clerk-react";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { LoaderIcon } from "lucide-react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className='flex flex-col items-center justify-center min-h-screen'>
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <div className='flex items-center justify-center min-h-screen'>
            <LoaderIcon className='animate-spin' />
            &nbsp; Please wait...
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
