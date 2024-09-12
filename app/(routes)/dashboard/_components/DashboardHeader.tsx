"use client";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

function DashboardHeader() {
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  return (
    user && (
      <div className="flex justify-between items-center ">
        <header className="bg-white p-5">
          <Link href="/dashboard">
            <div className="text-xl font-bold">Meeting Scheduler</div>
          </Link>
        </header>
        <div className="pr-5">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Image
                  src={user?.picture}
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/create-meeting")}
                >
                  Create Meeting
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/meeting-type")}
                >
                  My Meeting
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/scheduled-meeting")}
                >
                  Scheduled Meeting
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <LogoutLink>Logout</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    )
  );
}

export default DashboardHeader;
