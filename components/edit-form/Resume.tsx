"use client";

import Image from "next/image";
import { useState } from "react";

import { IProfile } from "@/types";
import WorkExperienceModal from "../modal/WorkExperienceModal";

interface IResumeFormProps {
  profileData: IProfile;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

const Resume = ({ profileData }: IResumeFormProps) => {
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] =
    useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [resumeInfo, setResumeInfo] = useState({
    workExperience: profileData.workExperience,
  });

  const closeWorkExperienceModal = () => {
    setIsWorkExperienceModalOpen(false);
  };

  const closeEducationModal = () => {
    setIsEducationModalOpen(false);
  };

  return (
    <section className="max-w-[628px] mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex-between gap-5 flex-wrap">
            <WorkExperienceModal openModal = {isWorkExperienceModalOpen} closeModal = {closeWorkExperienceModal} id={profileData._id} />
            <h2 className="text-zinc-900 text-2xl font-bold">
              Work Experience
            </h2>

            <p className="cursor-pointer text-[#4F46E5] text-base font-semibold" onClick={() => setIsWorkExperienceModalOpen(true)}>
              Add new work experience
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {resumeInfo.workExperience.map((company) => (
              <div
                key={company.companyName}
                className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg flex"
              >
                <Image
                  src="/assets/icons/company.png"
                  alt={company.companyName}
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Resume;
