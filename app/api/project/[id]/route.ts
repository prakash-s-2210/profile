import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoose";
import Project from "@/mongodb/project.model";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { title, technology, githubLink, picture, id } = await request.json();

  try {
    await connectToDB();

    const updatedProject = await Project.findOneAndUpdate(
      { _id: id },
      { title, technology, githubLink, picture, createdAt: new Date(), updatedAt: new Date() }
    );
    return NextResponse.json("Successfully updated the Project", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating Project" },
      { status: 500 }
    );
  }
};
