"use client";

import { Types } from "mongoose";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import Modal from "../shared/Modal";
// import { createProject, editProject } from "@/lib/actions/project.actions";
import { IWorkExperience } from "@/types";

interface IWorkExperienceModalProps {
  openModal: boolean;
  closeModal: () => void;
  id?: Types.ObjectId;
  workExperienceInfo?: IWorkExperience;
}

const WorkExperienceModal = ({
  openModal,
  closeModal,
  id,
  workExperienceInfo,
}: IWorkExperienceModalProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [workExperienceData, setWorkExperienceData] = useState({
    title: workExperienceInfo?.title ?? "",
    companyName: workExperienceInfo?.companyName ?? "",
    location: workExperienceInfo?.location ?? "",
    startDate: workExperienceInfo?.startDate ?? "",
    endDate: workExperienceInfo?.endDate ?? "",
    present: workExperienceInfo?.present ?? false,
    description: workExperienceInfo?.description ?? "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    // if (workExperienceInfo) {
    //   await editProject(
    //     projectData.title,
    //     projectData.technology,
    //     projectData.githubLink,
    //     picture ? picture : projectData.picture,
    //     projectInfo._id
    //   );
    // } else {
    //   await createProject(
    //     projectData.title,
    //     projectData.technology,
    //     projectData.githubLink,
    //     picture ? picture : projectData.picture,
    //     id!
    //   );
    //   setWorkExperienceData({
    //     title: "",
    //     companyName: "",
    //     location: "",
    //     startDate: "",
    //     endDate: "",
    //     present: false,
    //     description: "",
    //   });
    // }
    setIsSubmitting(false);
    closeModal();
    startTransition(() => {
      router.refresh();
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setWorkExperienceData({
      ...workExperienceData,
      [name]: value,
    });
  };

  return (
    <>
      {openModal && (
        <Modal openModal={openModal} closeModal={closeModal}>
          <section>
            <h3 className="text-gray-600 text-xl font-semibold pb-5">
              {workExperienceInfo
                ? "Update a work experience"
                : "Add a work experience"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="pt-5 border-t border-t-gray-300"
            >
              <label
                htmlFor="title"
                className="text-gray-700 inline-block pb-3 font-medium text-base"
              >
                Title
              </label>

              <input
                type="text"
                required
                placeholder="Ex:Software Engineer"
                value={workExperienceData.title}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("title", e.target.value)}
              />

              <label
                htmlFor="company-name"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Company name
              </label>

              <input
                type="text"
                required
                placeholder="Ex: Google"
                value={workExperienceData.companyName}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />

              <label
                htmlFor="location"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Location
              </label>

              <input
                type="text"
                required
                placeholder="Ex: India"
                value={workExperienceData.location}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("location", e.target.value)}
              />

              <input type="checkbox" className="block"/>

              <label
                htmlFor="start-date"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Start date
              </label>

              <input
                type="month"
                required
                placeholder="Ex: March, 2023"
                value={workExperienceData.startDate.toString()}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />

              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 rounded-lg text-sm font-semibold text-white"
                >
                  {`${
                    isSubmitting
                      ? workExperienceInfo
                        ? "Updating..."
                        : "Creating..."
                      : workExperienceInfo
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

export default WorkExperienceModal;
