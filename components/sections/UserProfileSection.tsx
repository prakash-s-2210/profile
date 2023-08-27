import Image from "next/image";
import Link from "next/link";

import { IProfile } from "@/types";

interface IUserProfileProps {
  profileData: IProfile;
  query: string;
}

const UserProfileSection = ({ profileData, query }: IUserProfileProps) => {
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

      <div className="relative flex md:flex-row flex-col gap-6 max-md:px-5 pr-8">
        <div className="relative bottom-[70px] md:left-5 w-fit h-fit z-20">
          <Image
            src={profileData.profilePicture}
            alt={profileData.name}
            width={140}
            height={140}
            className="min-w-[140px] min-h-[140px] max-w-[140px] max-h-[140px] object-cover rounded-full border-2 border-zinc-100"
          />

          <Image
            src="/assets/icons/badge.svg"
            alt="badge"
            width={20}
            height={20}
            className="absolute w-min md:top-24 -bottom-4 right-0 md:-right-2"
          />
        </div>

        <Link
          href="edit-profile"
          className="py-2 px-4 border border-blue-400 rounded-md text-sm text-blue-400 hover:bg-gray-100 absolute top-0 right-4"
        >
          Edit Profile
        </Link>

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
            {profileData?.techStacks.map((tech) => {
              const [label, imgUrl] = tech.split("|");
              return (
                <p
                  key={tech}
                  className="py-2 px-3 rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-900"
                >
                  {label}
                </p>
              );
            })}
          </div>

          <div className="flex-between flex-wrap gap-5 border-t border-t-[#F4F4F5] py-8">
            {profileData.socialLinks && <div className="flex flex-wrap gap-4">
              {profileData.gmail && (
                <Link
                  href={profileData.gmail}
                  target="_blank"
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/gmail.svg"
                    alt="gmail"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.instagram && (
                <Link
                  href={profileData.instagram}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/instagram.svg"
                    alt="instagram"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.facebook && (
                <Link
                  href={profileData.facebook}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/facebook.svg"
                    alt="facebook"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.linkedin && (
                <Link
                  href={profileData.linkedin}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/linked-in.svg"
                    alt="linked-in"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.youtube && (
                <Link
                  href={profileData.youtube}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/youtube.svg"
                    alt="youtube"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.github && (
                <Link
                  href={profileData.github}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/github.svg"
                    alt="github"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.dribble && (
                <Link
                  href={profileData.dribble}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/dribble.svg"
                    alt="dribble"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}

              {profileData.behance && (
                <Link
                  href={profileData.behance}
                  className="p-2 border border-zinc-200 rounded-lg cursor-pointer"
                >
                  <Image
                    src="/assets/icons/behance.svg"
                    alt="behance"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>
              )}
            </div>}

            {query === "portfolio" || query === undefined ? (
              <div className="flex gap-4">
                <div className="p-3 bg-zinc-100 rounded-lg">
                  <Image
                    src="/assets/icons/saved.svg"
                    alt="saved"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </div>

                <button className="py-2 px-4 bg-primary-600 rounded-lg text-sm font-semibold text-white">
                  Contact
                </button>
              </div>
            ) : (
              profileData.followersAndFollowing && (
                <button className="py-2 px-4 bg-zinc-100 rounded-l text-sm text-zinc-900 font-semibold">
                  Follow
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileSection;
