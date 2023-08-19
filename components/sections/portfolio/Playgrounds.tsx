"use client";

import { Types } from "mongoose";

import { useState } from "react";

import PlaygroundModal from "../../modal/PlaygroundModal";

interface IPlaygroundProps {
  id: Types.ObjectId;
}

const Playgrounds = ({ id }: IPlaygroundProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PlaygroundModal
        openModal={isModalOpen}
        closeModal={closeModal}
        id={id}
      />

      <div className="flex-between flex-wrap gap-5">
        <h3 className="text-zinc-900 text-2xl font-bold">Playgrounds</h3>

        <p
          className="text-base font-semibold text-primary-600 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Create new playground
        </p>
      </div>
    </>
  );
};

export default Playgrounds;
