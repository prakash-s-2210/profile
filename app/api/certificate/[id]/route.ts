import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import Certificate from "@/mongodb/certificate.model";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { title, technology, issuedDate, credentials,  id } = await request.json();

  try {
    await connectToDB();

    const updatedCertificate = await Certificate.findOneAndUpdate(
      { _id: id },
      { title, technology, issuedDate, credentials }
    ).exec();
    return NextResponse.json("Successfully updated the Certificate", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating Certificate: ${error}` },
      { status: 500 }
    );
  }
};
