import Image from "next/image";

import { IProfile } from "@/types";

interface IUserProfileProps{
    profileData: IProfile
}

const UserProfileSection = ({profileData}: IUserProfileProps) => {
  return (
    <section className="max-sm:mx-5 flex flex-col gap-6 sm:border max-sm:border-b border-zinc-200 sm:rounded-2xl">
      <div className="relative">
        <Image
          src="/assets/images/cover.png"
          alt="cover picture"
          width={738}
          height={160}
          className="h-40 w-full"
        />

        <div className="absolute top-2 sm:top-6 right-2 sm:right-6 flex-center gap-2 p-2 bg-[rgba(255,255,255,0.16)] rounded-lg backdrop-blur-[6px]">
          <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={13}
            height={13}
          />

          <p className="max-sm:hidden text-xs font-semibold text-white">
            Edit cover
          </p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-6 max-md:px-5">
        <div className="relative bottom-[70px] md:left-5 w-fit h-fit">
          <Image
            src={profileData.profilePicture}
            alt={profileData.name}
            width={140}
            height={140}
          />

          <Image
            src="/assets/icons/badge.svg"
            alt="badge"
            width={20}
            height={20}
            className="absolute w-min md:top-14 max-md:-bottom-2 right-0 md:-right-2"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-[28px] leading-8 font-bold text-zinc-900">
                {profileData.name}
              </h2>

              <p className="px-3 py-[2px] rounded bg-success-300 text-zinc-900 text-sm font-semibold">
                Pro
              </p>

              <p className="px-3 py-[2px] rounded bg-secondary-100 text-secondary-800 text-sm font-semibold">
                Looking for job
              </p>
            </div>

            <p className="text-zinc-500 text-base">{profileData.headline}</p>

            <div className="flex items-center gap-1">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={12}
                height={12}
              />

              <p className="text-zinc-400 text-base">{profileData.location}</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {profileData?.techStacks.map((tech) => (
              <>
                <p
                  key={tech}
                  className="py-2 px-3 rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-900"
                >
                  {tech}
                </p>
              </>
            ))}
          </div>

          <div className="border-t border-t-[#F4F4F5] pt-8"></div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileSection;
