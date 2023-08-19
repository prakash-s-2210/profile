"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/shadcn-ui/sheet";
import { leftSidebar } from "@/constants";
import { usePathname } from "next/navigation";

interface ILeftSidebarProps {
    query: string;
}

export const Sidebar = ({ query }: ILeftSidebarProps) => {
    console.log(query)
  return (
    <section className="py-8">
      <div className="p-6">
        {leftSidebar.map((link) => {
            
          return (
            <Link
              href={`/edit-profile?query=${link.label.toLowerCase()}`}
              key={link.label}
              className="relative flex items-center gap-2 py-3 pr-4"
            >
              <SheetClose className="flex items-center gap-2">
                {(query === link.label.toLowerCase() ||
                  (query === undefined && link.label === "Profile")) && (
                  <Image
                    src="/assets/icons/indicator.svg"
                    alt="indicator"
                    width={10}
                    height={35}
                    className="h-[35px] absolute -left-6"
                  />
                )}

                <Image
                  src="/assets/icons/google.svg"
                  alt="google"
                  width={20}
                  height={20}
                  className={` ${
                    (query === link.label.toLowerCase() ||
                      (query === undefined && link.label === "Profile")) &&
                    "indicator-black"
                  }`}
                />

                <p
                  className={`${
                    query === link.label.toLowerCase() ||
                    (query === undefined && link.label === "Profile")
                      ? "text-zinc-900"
                      : "text-zinc-400"
                  }  text-base font-semibold`}
                >
                  {link.label}
                </p>
              </SheetClose>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export function SidebarModal({ query }: ILeftSidebarProps) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        {pathname === "/edit-profile" && (
          <Image
            src="/assets/icons/hamburger.svg"
            alt="hamburger"
            width={24}
            height={24}
            className="cursor-pointer md:hidden"
          />
        )}
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar query={query} />
      </SheetContent>
    </Sheet>
  );
}
