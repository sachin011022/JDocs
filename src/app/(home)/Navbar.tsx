import Link from "next/link";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

import HomeInput from "./Home-input";
import Logo from "@/components/logo/Logo";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between h-full w-full p-3'>
      <div className='flex gap-3 items-center shrink-0 pr-6'>
        <Link href={"/"} className='flex items-center gap-x-3 print:hidden'>
          <Logo />
          <h1 className='text-3xl font-bold'>
            <span className='text-blue-700'>J</span>Docs
          </h1>
        </Link>
      </div>
      <HomeInput />
      <div className='flex items-center gap-4 pl-6'>
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />

        <UserButton />
      </div>
    </nav>
  );
}
