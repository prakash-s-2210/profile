"use client";

import Image from "next/image";

import CertificateModal from "../modal/CertificateModal";
import { useState } from "react";
import { ICertificate } from "@/types";

interface IEditCertificateProps {
  certificate: ICertificate;
}

const EditCertificate = ({ certificate }: IEditCertificateProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CertificateModal
        openModal={isModalOpen}
        closeModal={closeModal}
        certificateInfo={certificate}
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

export default EditCertificate;