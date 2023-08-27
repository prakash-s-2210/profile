"use client";

import { Types } from "mongoose";

import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import Modal from "../shared/Modal";
import { IEducation } from "@/types";
import { Checkbox } from "../shadcn-ui/checkbox";
import { createEducation, editEducation } from "@/lib/actions/edit-form/education.actions";
import { useToast } from "../shadcn-ui/use-toast";


interface IEducationModalProps {
  openModal: boolean;
  closeModal: () => void;
  id?: Types.ObjectId;
  educationInfo?: IEducation;
}

const EducationModal = ({
  openModal,
  closeModal,
  id,
  educationInfo,
}: IEducationModalProps) => {
  const {toast} = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [educationData, setEducationData] = useState({
    name: educationInfo?.name ?? "",
    location: educationInfo?.location ?? "",
    qualification: educationInfo?.qualification ?? "",
    startDate: educationInfo?.startDate ?? "",
    endDate: educationInfo?.endDate ?? "",
    present: educationInfo?.present ?? false,
    description: educationInfo?.description ?? "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      variant: "destructive",
      description: "You are not Authorized",
    });
    // setIsSubmitting(true);
    // const {
    //     name,
    //     location,
    //     qualification,
    //     startDate,
    //     endDate,
    //     present,
    //     description
    //  } = educationData;

    // if (educationInfo) {
    //   await editEducation({
    //     name,
    //     location,
    //     qualification,
    //     startDate,
    //     endDate,
    //     present,
    //     description,
    //     id: educationInfo._id,
    //   });
    // } else {
    //   await createEducation({
    //     name,
    //     location,
    //     qualification,
    //     startDate,
    //     endDate,
    //     present,
    //     description,
    //     id,
    //   });
    //   setEducationData({
    //     name: "",
    //     location: "",
    //     qualification: "",
    //     startDate: "",
    //     endDate: "",
    //     present: false,
    //     description
    //   });
    // }
    // setIsSubmitting(false);
    closeModal();
    // startTransition(() => {
    //   router.push("/?query=resume");
    //   router.refresh();
    // });
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setEducationData({
      ...educationData,
      [name]: value,
    });
  };

  return (
    <>
      {openModal && (
        <Modal openModal={openModal} closeModal={closeModal}>
          <section>
            <h3 className="text-gray-600 text-xl font-semibold pb-5">
              {educationInfo
                ? "Update a education"
                : "Add education"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="pt-5 border-t border-t-gray-300"
            >
              <label
                htmlFor="name"
                className="text-gray-700 inline-block pb-3 font-medium text-base"
              >
                School
              </label>

              <input
                type="text"
                required
                placeholder="Ex:Boston University"
                value={educationData.name}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                placeholder="Ex: Chennai, Tamilnadu, India"
                value={educationData.location}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) =>
                  handleInputChange("location", e.target.value)
                }
              />

              <label
                htmlFor="qualification"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Qualification
              </label>

              <input
                type="text"
                required
                placeholder="Ex: Bachelor's"
                value={educationData.qualification}
                className="w-full pt-3 px-4 py-2 mb-4 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("qualification", e.target.value)}
              />

              <div className="flex items-center gap-3">
                <Checkbox
                  id="present"
                  checked={educationData.present}
                  defaultChecked={educationData.present}
                  onCheckedChange={(e) => {
                    handleInputChange("present", !educationData.present);
                  }}
                  className="w-5 h-5 data-[state=checked]:bg-primary-600 data-[state=checked]:border-none"
                />
                <label
                  htmlFor="present"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Present
                </label>
              </div>

              <label
                htmlFor="start-date"
                className="text-gray-700 block pt-3 pb-3 font-medium text-base"
              >
                Start date
              </label>

              <input
                type="month"
                required
                placeholder="Ex: June, 2018"
                value={`${new Date(educationData.startDate).getFullYear()}-${(new Date(educationData.startDate).getMonth() + 1).toString().padStart(2, '0')}`}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />

              <label
                htmlFor="end-date"
                className="text-gray-700 block pt-3 pb-3 font-medium text-base"
              >
                End date
              </label>

              <input
                type="month"
                required
                disabled={educationData.present as boolean}
                placeholder="Ex: March, 2022"
                value={`${new Date(educationData.endDate).getFullYear()}-${(new Date(educationData.endDate).getMonth() + 1).toString().padStart(2, '0')}`}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />

              <label
                htmlFor="description"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Description
              </label>

              <textarea
                value={educationData.description}
                className="w-full pt-3 px-4 py-2 mb-4 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />

              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 rounded-lg text-sm font-semibold text-white"
                >
                  {`${
                    isSubmitting
                      ? educationInfo
                        ? "Updating..."
                        : "Creating..."
                      : educationInfo
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

export default EducationModal;
