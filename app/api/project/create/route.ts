import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import Project from "@/mongodb/project.model";

export const POST = async (request: Request) => {
  const { title, technology, githubLink, picture, id } = await request.json();

  try {
    await connectToDB();

    const createdProject = await Project.create({
      title,
      technology,
      githubLink,
      picture,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await Profile.findByIdAndUpdate(id, {
      $push: { projects: createdProject._id },
    }).exec();

    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create a Project" },
      { status: 500 }
    );
  }
};
