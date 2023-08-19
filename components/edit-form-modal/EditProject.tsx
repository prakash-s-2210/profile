"use client";

import Image from "next/image";

import ProjectModal from "../modal/ProjectModal";
import { useState } from "react";
import { IProject } from "@/types";

interface IEditProjectProps {
  project: IProject;
}

const EditProject = ({ project }: IEditProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProjectModal
        openModal={isModalOpen}
        closeModal={closeModal}
        projectInfo={project}
      />
      <Image
        src="/assets/icons/edit-blue.svg"
        alt="edit"
        width={13}
        height={13}
        className="cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />
    </>
  );
};

export default EditProject;
