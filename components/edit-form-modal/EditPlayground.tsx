"use client";

import Image from "next/image";

import PlaygroundModal from "../modal/PlaygroundModal";
import { useState } from "react";
import { IPlayground } from "@/types";

interface IEditPlaygroundProps {
  playground: IPlayground;
}

const EditPlayground = ({ playground }: IEditPlaygroundProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PlaygroundModal
        openModal={isModalOpen}
        closeModal={closeModal}
        playgroundInfo={playground}
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

export default EditPlayground;