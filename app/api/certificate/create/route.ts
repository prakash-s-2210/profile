import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import Certificate from "@/mongodb/certificate.model";

export const POST = async (request: Request) => {
  const { title, technology,issuedDate, credentials, id } = await request.json();

  try {
    await connectToDB();

    const createdCertificate = await Certificate.create({
      title,
      technology,
      issuedDate,
      credentials
    });
    
    await Profile.findByIdAndUpdate(id, {
      $push: { certificates: createdCertificate._id },
    }).exec();

    return NextResponse.json(createdCertificate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to create a Certificate: ${error}` },
      { status: 500 }
    );
  }
};
