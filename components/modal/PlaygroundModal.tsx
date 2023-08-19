"use client";

import { Types } from "mongoose";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import Modal from "../shared/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/select";

import { technologies } from "@/constants";
import { IPlayground, tech } from "@/types";
import { createPlayground, editPlayground } from "@/lib/actions/playground.actions";

interface IPlaygroundModalProps {
  openModal: boolean;
  closeModal: () => void;
  id?: Types.ObjectId;
  playgroundInfo?: IPlayground;
}

const PlaygroundModal = ({
  openModal,
  closeModal,
  id,
  playgroundInfo,
}: IPlaygroundModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [playgroundData, setPlaygroundData] = useState({
    title: playgroundInfo?.title ?? "",
    technology: playgroundInfo?.technology ?? "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (playgroundInfo) {
        await editPlayground(
          playgroundData.title,
          playgroundData.technology,
          playgroundInfo._id
        );
    } else {
        await createPlayground(
          playgroundData.title,
          playgroundData.technology,
          id!
        );
      setPlaygroundData({
        title: "",
        technology: "",
      });
    }
    setLoading(false);
    closeModal();
    startTransition(() => {
      router.refresh();
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setPlaygroundData({
      ...playgroundData,
      [name]: value,
    });
  };

  return (
    <>
      {openModal && (
        <Modal openModal={openModal} closeModal={closeModal}>
          <section>
            <h3 className="text-gray-600 text-xl font-semibold pb-5">
              {playgroundInfo ? "Update a playground" : "Create a playground"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="pt-5 border-t border-t-gray-300"
            >
              <label
                htmlFor="title"
                className="text-gray-700 inline-block pb-3 font-medium text-base"
              >
                Playground Title
              </label>

              <input
                type="text"
                required
                placeholder="Enter a title"
                value={playgroundData.title}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              <label
                htmlFor="technology"
                className="text-gray-700 font-medium text-base pt-5 pb-3 inline-block"
              >
                Technology
              </label>

              <Select
                value={playgroundInfo?.technology}
                onValueChange={(value) =>
                  handleInputChange("technology", value)
                }
                required
              >
                <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus:ring-transparent h-fit px-4 py-3 border border-border rounded-lg text-gray-500">
                  <SelectValue placeholder="Select Technology"></SelectValue>
                </SelectTrigger>

                <SelectContent className="max-h-52 overflow-y-auto">
                  <SelectGroup>
                    <SelectLabel>Technologies</SelectLabel>
                    {technologies.map((tech: tech) => (
                      <SelectItem
                        key={tech.label}
                        value={`${tech.label}|${tech.imgUrl}`}
                      >
                        <div className="flex gap-5">
                          <Image
                            src={tech.imgUrl}
                            alt={tech.label}
                            width={18}
                            height={18}
                          />
                          <p className="text-gray-500">{tech.label}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 rounded-lg text-sm font-semibold text-white"
                >
                  {`${
                    loading
                      ? playgroundInfo
                        ? "Updating..."
                        : "Creating..."
                      : playgroundInfo
                      ? "Update"
                      : "Create"
                  }`}
                </button>
              </div>
            </form>
          </section>
        </Modal>
      )}
    </>
  );
};

export default PlaygroundModal;
