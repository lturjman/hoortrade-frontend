"use client";

import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";
import { useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function Menu() {
  const user = useSelector((state) => state.users.me);
  const pathname = usePathname();

  const hiddenMenuRoutes = ["/", "/auth/login", "/auth/register"];
  if (hiddenMenuRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className="bg-white h-[10vh] shadow-md flex items-center justify-between px-6">
      <Link href="/products">
        <h1 className="text-xl lg:text-2xl font-bold">
          Hoortrade Product Manager
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-gray-600" />
          {(user?.firstname || user?.lastname) && (
            <span className="font-bold">
              {user?.firstname} {user?.lastname}
            </span>
          )}
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
