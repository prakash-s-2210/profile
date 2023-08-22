"use client";

import Image from "next/image";

import EducationModal from "../modal/EducationModal";
import { useState } from "react";
import { IEducation } from "@/types";

interface IEditEducationProps {
  education: IEducation;
}

const EditEducation = ({ education }: IEditEducationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <EducationModal
        openModal={isModalOpen}
        closeModal={closeModal}
        educationInfo={education}
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

export default EditEducation;
