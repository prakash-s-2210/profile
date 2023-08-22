import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import WorkExperience from "@/mongodb/workExperience.model";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
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

    const updatedWorkExperience = await WorkExperience.findOneAndUpdate(
      { _id: id },
      { title, companyName, location, startDate, endDate, present, description }
    );
    return NextResponse.json("Successfully updated the work experience", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating work experience" },
      { status: 500 }
    );
  }
};
