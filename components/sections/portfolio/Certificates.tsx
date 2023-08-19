"use client";

import { Types } from "mongoose";

import { useState } from "react";

import CertificateModal from "@/components/modal/CertificateModal";

interface ICertificateProps {
  id: Types.ObjectId;
}

const Certificates = ({ id }: ICertificateProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CertificateModal
        openModal={isModalOpen}
        closeModal={closeModal}
        id={id}
      />

      <div className="flex-between flex-wrap gap-5">
        <h3 className="text-zinc-900 text-2xl font-bold">Certificates</h3>

        <p
          className="text-base font-semibold text-primary-600 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Add new certificate
        </p>
      </div>
    </>
  );
};

export default Certificates;
