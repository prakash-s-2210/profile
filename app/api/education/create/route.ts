import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import Education from "@/mongodb/education.model";

export const POST = async (request: Request) => {
  const {
    name,
    location,
    qualification,
    startDate,
    endDate,
    present,
    description,
    id,
  } = await request.json();

  try {
    await connectToDB();

    const createdEducation = await Education.create({
      name,
      location,
      qualification,
      startDate,
      endDate,
      present,
      description,
    });

    await Profile.findByIdAndUpdate(id, {
      $push: { education: createdEducation._id },
    }).exec();

    return NextResponse.json(createdEducation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add a education" },
      { status: 500 }
    );
  }
};
