"use client";

import Image from "next/image";

import WorkExperienceModal from "../modal/WorkExperienceModal";
import { useState } from "react";
import { IWorkExperience } from "@/types";

interface IEditWorkExperienceProps {
  company: IWorkExperience;
}

const EditWorkExperience = ({ company }: IEditWorkExperienceProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <WorkExperienceModal
        openModal={isModalOpen}
        closeModal={closeModal}
        workExperienceInfo={company}
      />

      <Image
        src="/assets/icons/edit-blue.svg"
        alt="edit"
        width={16}
        height={16}
        className="absolute right-5 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
};

export default EditWorkExperience;
