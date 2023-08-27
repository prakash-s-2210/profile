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
import { ICertificate, tech } from "@/types";
import { createCertificate, editCertificate } from "@/lib/actions/profile/certificate.actions";
import { convertMonthYearFormat } from "@/lib/utils";
import { useToast } from "../shadcn-ui/use-toast";

interface ICertificateModalProps {
  openModal: boolean;
  closeModal: () => void;
  id?: Types.ObjectId;
  certificateInfo?: ICertificate;
}

const CertificateModal = ({
  openModal,
  closeModal,
  id,
  certificateInfo,
}: ICertificateModalProps) => {
  const {toast} = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const issuedDate = convertMonthYearFormat(certificateInfo?.issuedDate as Date)
  const [certificateData, setCertificateData] = useState({
    title: certificateInfo?.title ?? "",
    technology: certificateInfo?.technology ?? undefined,
    issuedDate: issuedDate  ?? "",
    credentials: certificateInfo?.credentials ?? "",
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      variant: "destructive",
      description: "You are not Authorized",
    });
    // setLoading(true);
    // if (certificateInfo) {
    //     await editCertificate(
    //       certificateData.title,
    //       certificateData.technology,
    //       certificateData.issuedDate,
    //       certificateData.credentials,
    //       certificateInfo._id
    //     );
    // } else {
    //     await createCertificate(
    //       certificateData.title,
    //       certificateData.technology,
    //       certificateData.issuedDate,
    //       certificateData.credentials,
    //       id!
    //     );
    //   setCertificateData({
    //     title: "",
    //     technology: "",
    //     issuedDate: "",
    //     credentials: ""
    //   });
    // }
    // setLoading(false);
    closeModal();
    // startTransition(() => {
    //   router.refresh();
    // });
  };

  const handleInputChange = (name: string, value: string) => {
    setCertificateData({
      ...certificateData,
      [name]: value,
    });
  };

  return (
    <>
      {openModal && (
        <Modal openModal={openModal} closeModal={closeModal}>
          <section>
            <h3 className="text-gray-600 text-xl font-semibold pb-5">
             {certificateInfo ? "Update a certificate" : "Create a certificate"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="pt-5 border-t border-t-gray-300"
            >
              <label
                htmlFor="title"
                className="text-gray-700 inline-block pb-3 font-medium text-base"
              >
                Certificate Title
              </label>

              <input
                type="text"
                required
                placeholder="Enter a title"
                value={certificateData.title}
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
                value={certificateData?.technology}
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
                        <div className="flex items-center gap-5">
                          <Image
                            src={tech.imgUrl}
                            alt={tech.label}
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px]"
                          />
                          <p className="text-gray-500">{tech.label}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <label
                htmlFor="issuedDate"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Issued Date
              </label>

              <input
                type="month"
                required
                placeholder="Enter a Issued Date"
                value={certificateData.issuedDate}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("issuedDate", e.target.value)}
              />

              <label
                htmlFor="credentials"
                className="text-gray-700 inline-block pt-5 pb-3 font-medium text-base"
              >
                Credentials
              </label>

              <input
                type="text"
                required
                placeholder="Enter a credentials"
                value={certificateData.credentials}
                className="w-full pt-3 px-4 py-2 outline-none placeholder:text-gray-400 text-gray-500 border border-gray-300 rounded-lg focus:border-2 focus:border-primary-600"
                onChange={(e) => handleInputChange("credentials", e.target.value)}
              />

              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 rounded-lg text-sm font-semibold text-white"
                >
                  {`${
                    loading
                      ? certificateInfo
                        ? "Updating..."
                        : "Creating..."
                      : certificateInfo
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

export default CertificateModal;
