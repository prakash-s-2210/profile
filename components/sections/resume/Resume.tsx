import Image from "next/image";

import { IProfile } from "@/types";
import About from "./About";

interface IResumeProps {
  profileData: IProfile;
  filteredLanguagesWithImages?: {
    name: string | undefined;
    image: string | undefined;
  }[]
}

const Resume = ({ profileData, filteredLanguagesWithImages }: IResumeProps) => {
  return (
    <div className="max-md:mx-5 flex flex-col gap-10 mt-10">
      <About profileData={profileData} />

      {/* <section>
        <div className="flex gap-4 flex-wrap p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
          <Image
            src="/assets/icons/test.svg"
            alt="tets"
            width={40}
            height={40}
          />

          <div className="flex-1">
            <h3 className="text-zinc-900 text-xl font-semibold">
              Front-end developer at Google
            </h3>

            <div className="flex justify-between">
              <div className="text-zinc-900 text-base flex items-center gap-2">
                <p>London</p>

                <span className="bg-zinc-600 h-1 w-1 rounded-full"></span>

                <p>Google Inc</p>
              </div>

              <p className="text-zinc-900 text-base font-semibold">
                May 2021 - Present
              </p>
            </div>

            <p className="text-zinc-500 text-base">
              This role would be great for a web developer with 3+ years&apos;
              experience in designing and developing responsive websites. This
              position requires a profound understanding of the development
              process, using front-end technologies including HTML5, CSS3,
              JavaScript, jQuery, PHP/WordPress.
            </p>
          </div>
        </div>
      </section> */}

      <section className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-zinc-900">Interests</h3>
        
        <div className="flex gap-5 flex-wrap">
          {profileData.interests.map((interest) => (
            <p
              key={interest}
              className="py-2 pl-2 pr-3 bg-zinc-50 border border-zinc-100 rounded-lg text-base text-zinc-900"
            >
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h3 className="text-zinc-900 text-2xl font-bold">Languages</h3>

        <div className="flex flex-wrap gap-5">
          {filteredLanguagesWithImages?.map((language) => (
            <div key={language.name} className="flex gap-2 py-2 pl-2 pr-3 bg-zinc-50 border border-zinc-100 rounded-lg">
              <Image src={language?.image as string} alt={language?.name as string} width={20} height={14} className="min-h-[14px] h-full object-contain" />

              {language.name && <p className="text-zinc-900 text-base font-semibold"> {language.name.charAt(0).toUpperCase() + language.name.slice(1)}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resume;
