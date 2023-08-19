import Image from "next/image";
import Link from "next/link";

import { ICertificate } from "@/types";
import { monthYearFormat } from "@/lib/utils";
import EditCertificate from "../edit-form-modal/EditCertificate";

interface ICertificatesProps {
  certificate: ICertificate;
}

const CertificateCard = ({ certificate }: ICertificatesProps) => {
  const [label, imgSrc] = certificate.technology.split("|");

  return (
    <div className="flex flex-col gap-6 p-5 rounded-lg border border-zinc-100 bg-zink-50">
      <div className="flex-between">
        <Image
          src={imgSrc}
          alt={label}
          width={40}
          height={40}
          className="h-10 w-10"
        />

        <EditCertificate certificate = {certificate} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-zinc-900">
          {certificate.title}
        </h3>

        <p className="mt-1 text-sm text-zinc-500">{`Issued on ${monthYearFormat(certificate.issuedDate)}`}</p>

        <Link href={certificate.credentials} className="mt-3 text-sm font-semibold text-zinc-500">See credentials</Link>
      </div>
    </div>
  );
};

export default CertificateCard;
