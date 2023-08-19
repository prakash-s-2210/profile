"use client";

import Image from "next/image";
import Link from "next/link";

import { leftSidebar } from "@/constants";

interface ILeftSidebarProps {
  query: string;
}

const LeftSidebar = ({ query }: ILeftSidebarProps) => {
  return (
    <section className="max-md:hidden py-16">
      <div className="p-6">
        {leftSidebar.map((link) => {
          return (
            <Link
              href={`/edit-profile?query=${link.label.toLowerCase()}`}
              key={link.label}
              className="relative flex items-center gap-2 py-3 pr-4"
            >
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
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
