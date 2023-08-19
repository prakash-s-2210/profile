"use client";

import { Types } from "mongoose";

import { useState } from "react";

import ProjectModal from "../../modal/ProjectModal";

interface IProjectProps {
  id: Types.ObjectId;
}

const Project = ({ id }: IProjectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProjectModal openModal = {isModalOpen} closeModal = {closeModal} id={id} />

      <div className="flex-between flex-wrap gap-5">
        <h3 className="text-zinc-900 text-2xl font-bold">Projects</h3>

        <p
          className="text-base font-semibold text-primary-600 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Create new project
        </p>
      </div>
    </>
  );
};

export default Project;
