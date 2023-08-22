import Image from "next/image";

import { IProfile } from "@/types";
import About from "./About";
import { formatDateToMonthYear } from "@/lib/utils";

interface IResumeProps {
  profileData: IProfile;
  filteredLanguagesWithImages?: {
    name: string | undefined;
    image: string | undefined;
  }[];
}

const Resume = ({ profileData, filteredLanguagesWithImages }: IResumeProps) => {
  return (
    <div className="max-md:mx-5 flex flex-col gap-10 mt-10">
      <About profileData={profileData} />

      <section className="flex flex-col gap-5">
        {profileData.workExperience.length > 0 &&
          profileData.workExperience.map((experience) => (
            <div key={experience.title}>
              <div className="flex gap-4 max-sm:flex-col p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <Image
                  src="/assets/icons/company.png"
                  alt="default image for work experience"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div className="flex-1">
                  <h3 className="text-zinc-900 text-xl font-semibold">
                    {`${experience.title} at ${experience.companyName}`}
                  </h3>

                  <div className="flex justify-between gap-x-5 gap-y-1 flex-wrap">
                    <div className="text-zinc-900 text-base flex items-center gap-2">
                      <p>{experience.location}</p>

                      <span className="bg-zinc-600 h-1 w-1 rounded-full"></span>

                      <p>{experience.companyName}</p>
                    </div>

                    <p className="text-zinc-900 text-base font-semibold">
                      {experience.present
                        ? `${formatDateToMonthYear(
                            experience.startDate
                          )} - Present`
                        : `${formatDateToMonthYear(
                            experience.startDate
                          )} - ${formatDateToMonthYear(experience.endDate)}`}
                    </p>
                  </div>

                  <p className="text-zinc-500 text-base">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </section>

      <section className="flex flex-col gap-5">
        {profileData.education.length > 0 &&
          profileData.education.map((education) => (
            <div key={education.name}>
              <div className="flex gap-4 max-sm:flex-col p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <Image
                  src="/assets/icons/university.png"
                  alt="default image for work education"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div className="flex-1">
                  <h3 className="text-zinc-900 text-xl font-semibold">
                    {education.name}
                  </h3>

                  <div className="flex justify-between gap-x-5 gap-y-1 flex-wrap">
                    <div className="text-zinc-900 text-base flex items-center gap-2">
                      <p>{education.location}</p>

                      <span className="bg-zinc-600 h-1 w-1 rounded-full"></span>

                      <p>{education.qualification}</p>
                    </div>

                    <p className="text-zinc-900 text-base font-semibold">
                      {education.present
                        ? `${formatDateToMonthYear(
                            education.startDate
                          )} - Present`
                        : `${formatDateToMonthYear(
                            education.startDate
                          )} - ${formatDateToMonthYear(education.endDate)}`}
                    </p>
                  </div>

                  <p className="text-zinc-500 text-base">
                    {education.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </section>

      <section className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-zinc-900">Tech skills</h3>

        <div className="flex gap-5 flex-wrap">
          {profileData.techStacks.map((tech) => {
            const [label, imgUrl] = tech.split("|");
            return (
              <div key={label} className="flex gap-2 p-2 pr-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                <Image src={imgUrl} alt={label} width={20} height={20} className="w-5 h-5" />

                <p className="font-semibold text-base text-zinc-900">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

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
            <div
              key={language.name}
              className="flex gap-2 py-2 pl-2 pr-3 bg-zinc-50 border border-zinc-100 rounded-lg"
            >
              <Image
                src={language?.image as string}
                alt={language?.name as string}
                width={20}
                height={14}
                className="min-h-[14px] h-full object-contain"
              />

              {language.name && (
                <p className="text-zinc-900 text-base font-semibold">
                  {" "}
                  {language.name.charAt(0).toUpperCase() +
                    language.name.slice(1)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resume;
