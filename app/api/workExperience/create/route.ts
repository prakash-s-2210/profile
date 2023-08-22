import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import WorkExperience from "@/mongodb/workExperience.model";

export const POST = async (request: Request) => {
  const {
    title,
    companyName,
    location,
    startDate,
    endDate,
    present,
    description,
    id,
  } = await request.json();

  try {
    await connectToDB();

    const createdWorkExperience = await WorkExperience.create({
        title,
        companyName,
        location,
        startDate,
        endDate,
        present,
        description,
    });

    await Profile.findByIdAndUpdate(id, {
      $push: { workExperience: createdWorkExperience._id },
    }).exec();

    return NextResponse.json(createdWorkExperience, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add a work experience" },
      { status: 500 }
    );
  }
};
