import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import Education from "@/mongodb/education.model";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
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

    const updatedEducation = await Education.findOneAndUpdate(
      { _id: id },
      {
        name,
        location,
        qualification,
        startDate,
        endDate,
        present,
        description,
        id,
      }
    );
    return NextResponse.json("Successfully updated education", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating education" },
      { status: 500 }
    );
  }
};
