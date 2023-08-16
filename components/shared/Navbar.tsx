import Image from "next/image";

import { IProfile } from "@/types";

interface INavbarProps{
  profileData: IProfile
}

const Navbar = ({profileData}: INavbarProps) => {
  return (
    <header className="max-w-5xl  mx-auto py-5 px-5 lg:px-0">
      <nav className="flex-between">
        <p className="flex items-center text-zinc-900 text-2xl font-bold">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={24}
            height={24}
          />
          odedamn
        </p>

        <div className="flex gap-6">
          <div className="max-md:hidden flex items-center gap-3 max-w-[368px] px-3 py-2 border border-zinc-100 rounded-[10px]">
            <div className="flex gap-2">
              <Image
                src="/assets/icons/search.svg"
                alt="search"
                width={20}
                height={20}
              />

              <input
                type="text"
                placeholder="Search"
                className="text-zinc-500 text-base outline-none"
              />
            </div>

            <div className="flex items-center gap-1">
              <p className="text-zinc-500 text-sm leading-[24px]">Courses</p>

              <Image
                src="/assets/icons/chevron-down.svg"
                alt="chevron down"
                width={14}
                height={14}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-3 py-2">
              <Image
                src="/assets/icons/lightning.svg"
                alt="lightning"
                width={24}
                height={24}
              />

              <p className="text-zinc-500 text-base font-extrabold">2</p>
            </div>

            <Image
              src="/assets/icons/bell.svg"
              alt="notification bell"
              width={28}
              height={28}
            />
          </div>

          <div className="relative">
            <Image
              src={profileData.profilePicture}
              alt={profileData.name}
              width={42}
              height={42}
            />

            <Image
              src="/assets/icons/badge.svg"
              alt="badge"
              width={20}
              height={20}
              className="absolute w-min -top-3 -right-1/2"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
