"use client";

import Image from "next/image";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { IProfile, tech } from "@/types";
import WorkExperienceModal from "../modal/WorkExperienceModal";
import { formatDateToMonthYear } from "@/lib/utils";
import EditWorkExperience from "../edit-form-modal/EditWorkExperience";
import EducationModal from "../modal/EducationModal";
import EditEducation from "../edit-form-modal/EditEducation";
import { technologies } from "@/constants";
import { Checkbox } from "../shadcn-ui/checkbox";
import { areArraysEqual } from "@/lib/utils";
import { updateResume } from "@/lib/actions/edit-form/editForm.actions";

interface IResumeFormProps {
  profileData: IProfile;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

const Resume = ({ profileData }: IResumeFormProps) => {
  const router = useRouter();
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] =
    useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<tech[]>(technologies);
  const [currentInterest, setCurrentInterest] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeInfo, setResumeInfo] = useState({
    techStacks: profileData.techStacks,
    interests: profileData.interests,
    languages: profileData.languages,
  });

  const closeWorkExperienceModal = () => {
    setIsWorkExperienceModalOpen(false);
  };

  const closeEducationModal = () => {
    setIsEducationModalOpen(false);
  };

  const handleSearch = (query: string) => {
    const filteredResults = technologies.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleInputChange = (name: string, value: string[]) => {
    const newProfileInfo = {
      ...resumeInfo,
      [name]: value,
    };
    const hasChanges =
      areArraysEqual(newProfileInfo.techStacks, profileData.techStacks) ||
      areArraysEqual(newProfileInfo.interests, profileData.interests) ||
      areArraysEqual(newProfileInfo.languages, profileData.languages);

    setHasChanges(hasChanges);
    setResumeInfo(newProfileInfo);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { techStacks, interests, languages } = resumeInfo;
    const id = profileData._id;
    await updateResume({
      techStacks,
      interests,
      languages,
      id,
    });

    setIsSubmitting(false);
    setHasChanges(false);
    startTransition(() => {
      router.push("/?query=resume");
      router.refresh();
    });
  };

  return (
    <section className="max-w-[628px] mx-auto w-full">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex-between gap-5 flex-wrap">
            <WorkExperienceModal
              openModal={isWorkExperienceModalOpen}
              closeModal={closeWorkExperienceModal}
              id={profileData._id}
            />
            <h2 className="text-zinc-900 text-2xl font-bold">
              Work Experience
            </h2>

            <p
              className="cursor-pointer text-[#4F46E5] text-base font-semibold"
              onClick={() => setIsWorkExperienceModalOpen(true)}
            >
              Add new work experience
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {profileData.workExperience.map((company) => {
              return (
                <div
                  key={company.companyName}
                  className="relative p-4 bg-zinc-50 border border-zinc-100 rounded-lg flex max-sm:flex-col gap-4"
                >
                  <Image
                    src="/assets/icons/company.png"
                    alt={company.companyName}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />

                  <EditWorkExperience company={company} />

                  <div>
                    <h3 className="text-zinc-900 text-xl font-semibold lg:max-w-[450px] sm:max-w-[350px]">{`${company.title} at ${company.companyName}`}</h3>

                    <div className="mt-1 flex items-center gap-2 text-base text-zinc-900">
                      <p>{company.location}</p>

                      <span className="h-1 w-1 rounded-full bg-zinc-600"></span>

                      <p>{company.companyName}</p>
                    </div>

                    <p className="text-zinc-900 text-base font-semibold">
                      {company.present
                        ? `${formatDateToMonthYear(
                            company.startDate
                          )} - Present`
                        : `${formatDateToMonthYear(
                            company.startDate
                          )} - ${formatDateToMonthYear(company.endDate)}`}
                    </p>

                    <p className="mt-5 text-zinc-500 text-base">
                      {company.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-10 border-t border-t-gray-400">
          <div className="flex-between gap-5 flex-wrap">
            <EducationModal
              openModal={isEducationModalOpen}
              closeModal={closeEducationModal}
              id={profileData._id}
            />

            <h2 className="text-zinc-900 text-2xl font-bold">Education</h2>

            <p
              className="cursor-pointer text-[#4F46E5] text-base font-semibold"
              onClick={() => setIsEducationModalOpen(true)}
            >
              Add Education
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {profileData.education.map((education) => {
              return (
                <div
                  key={education.name}
                  className="relative p-4 bg-zinc-50 border border-zinc-100 rounded-lg flex max-sm:flex-col gap-4"
                >
                  <Image
                    src="/assets/icons/university.png"
                    alt={education.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />

                  <EditEducation education={education} />

                  <div>
                    <h3 className="text-zinc-900 text-xl font-semibold lg:max-w-[450px] sm:max-w-[350px]">
                      {education.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-base text-zinc-900">
                      <p>{education.location}</p>

                      <span className="h-1 w-1 rounded-full bg-zinc-600"></span>

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

                    <p className="mt-5 text-zinc-500 text-base">
                      {education.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="pt-10 border-t border-t-gray-400"
        >
          <section className="pb-10 border-b border-b-gray-400">
            <h3 className="text-lg font-semibold text-gray-900">
              Manage Tech Stack{" "}
              <span className="ml-2 text-sm text-gray-600">{`(${resumeInfo.techStacks.length} selected)`}</span>
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Technologies selected here will be shown on your profile page.
            </p>

            <div className="flex gap-1.5 mt-4 mb-3 py-2 px-4 outline-none  text-gray-500 border border-gray-400 hover:ring-2 hover:ring-indigo-500 focus:ring-indigo-500 rounded-lg focus:border-2 focus:border-primary-600">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Search for technologies"
                className="flex-1 placeholder:text-gray-400 focus:outline-none"
              />

              <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => {
                  setSearchResults(technologies);
                  setSearchTerm("");
                }}
              />
            </div>

            <div className="grid max-h-[420px] grid-cols-1 gap-2 overflow-y-auto md:grid-cols-3">
              {searchResults.map((tech) => {
                // const [label, imgUrl] = tech.split("|");
                return (
                  <div
                    key={tech.label}
                    className={`flex items-center gap-2 py-2 px-4 border hover:border-indigo-500 rounded-md cursor-pointer ${
                      resumeInfo.techStacks.includes(tech.label+"|"+tech.imgUrl) &&
                      "border-green-500"
                    } `}
                    onClick={() => {
                      const updatedTechStacks = [...resumeInfo.techStacks];

                      const identifier: string = tech.label + "|" + tech.imgUrl;

                      if (updatedTechStacks.includes(identifier)) {
                        updatedTechStacks.splice(
                          updatedTechStacks.indexOf(identifier),
                          1
                        );
                      } else {
                        updatedTechStacks.push(identifier);
                      }
                      handleInputChange("techStacks", updatedTechStacks);
                    }}
                  >
                    <Image
                      src={tech.imgUrl}
                      alt={tech.label}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />

                    <p className="flex-1 truncate">{tech.label}</p>

                    {resumeInfo.techStacks.includes(tech.label) ? (
                      <Checkbox
                        checked={true}
                        className="data-[state=checked]:bg-green-300 data-[state=checked]:border-none"
                      />
                    ) : (
                      <Image
                        src="/assets/icons/hide.svg"
                        alt="hide eye"
                        width={18}
                        height={18}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="py-10 border-b border-b-gray-400">
            <h3 className="text-lg font-semibold text-gray-900">Interests</h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your interests here, and they will be displayed on your
              profile page as you enter them.
            </p>

            <input
              type="text"
              placeholder="Add your interest"
              value={currentInterest}
              className="mt-5 w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => {
                setCurrentInterest(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (currentInterest.trim() !== "") {
                    const updatedInterests = [
                      ...resumeInfo.interests,
                      currentInterest.trim(),
                    ];
                    handleInputChange("interests", updatedInterests);
                    setCurrentInterest("");
                  }
                }
              }}
            />

            {resumeInfo.interests.length > 0 && (
              <div className="flex items-center flex-wrap gap-3 border border-gray-400 p-4 rounded-md mt-5">
                {resumeInfo.interests.map((interest, index) => (
                  <div
                    key={interest + index}
                    className="flex items-center gap-2 border-2 border-primary-600 px-2 py-1 rounded-md bg-zinc-50"
                  >
                    <p className="text-zinc-900 text-sm font-medium">
                      {interest}
                    </p>

                    <Image
                      src="/assets/icons/close.svg"
                      alt="close"
                      width={14}
                      height={14}
                      className="cursor-pointer"
                      onClick={() => {
                        const updatedInterests = [...resumeInfo.interests];
                        updatedInterests.splice(index, 1);
                        handleInputChange("interests", updatedInterests);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="py-10">
            <h3 className="text-lg font-semibold text-gray-900">Languages</h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your languages here, and they will be displayed on your
              profile page as you enter them.
            </p>

            <input
              type="text"
              placeholder="Add your language"
              value={currentLanguage}
              className="mt-5 w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => {
                setCurrentLanguage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (currentLanguage.trim() !== "") {
                    const updatedLanguages = [
                      ...resumeInfo.languages,
                      currentLanguage.trim(),
                    ];
                    handleInputChange("languages", updatedLanguages);
                    setCurrentLanguage("");
                  }
                }
              }}
            />

            {resumeInfo.languages.length > 0 && (
              <div className="flex items-center flex-wrap gap-3 border border-gray-400 p-4 rounded-md mt-5">
                {resumeInfo.languages.map((language, index) => (
                  <div
                    key={language + index}
                    className="flex items-center flex-wrap gap-2 border-2 px-2 py-1 rounded-md bg-zinc-50 border-primary-600"
                  >
                    <p className="text-zinc-900 text-sm font-medium">
                      {language}
                    </p>

                    <Image
                      src="/assets/icons/close.svg"
                      alt="close"
                      width={14}
                      height={14}
                      className="cursor-pointer"
                      onClick={() => {
                        const updatedLanguages = [...resumeInfo.languages];
                        updatedLanguages.splice(index, 1);
                        handleInputChange("languages", updatedLanguages);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="w-full flex justify-end gap-3 text-sm font-semibold">
            <button
              type="button"
              className="py-2 px-4 bg-zinc-100 rounded-lg  text-zinc-900"
              onClick={() => {
                setResumeInfo({
                  techStacks: profileData.techStacks,
                  interests: profileData.interests,
                  languages: profileData.languages,
                });
                setHasChanges(false);
              }}
            >
              cancel
            </button>

            <button
              type="submit"
              className={`${
                hasChanges ? "opacity-100" : "pointer-events-none opacity-50"
              } px-4 py-2 bg-primary-600 rounded-lg text-white`}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Resume;
