"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabProps } from "@/types";

const Tab = ({ query }: TabProps) => {
  const pathname = usePathname();

  console.log("router", pathname, query);
  return (
    <div className="max-md:mx-5 flex gap-6 px-6 py-2 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 mt-10">
      <Link
        href="?query=portfolio"
        className={`${
          query === "portfolio" || (pathname === "/" && query !== "resume")
            ? "bg-primary-50 text-primary-700"
            : "bg-zinc-100 text-zinc-700"
        } px-3 py-2 rounded-lg text-sm font-medium`}
      >
        Portfolio
      </Link>

      <Link
        href="?query=resume"
        className={`${
          query === "resume"
            ? "bg-primary-50 text-primary-700"
            : "bg-zinc-100 text-zinc-700"
        } px-3 py-2 rounded-lg text-sm font-medium`}
      >
        Resume
      </Link>
    </div>
  );
};

export default Tab;
