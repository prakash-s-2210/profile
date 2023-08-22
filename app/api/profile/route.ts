import { NextResponse } from "next/server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import Project from "@/mongodb/project.model";
import Playground from "@/mongodb/playground.model";
import Certificate from "@/mongodb/certificate.model";
import WorkExperience from "@/mongodb/workExperience.model";
import Education from "@/mongodb/education.model";

export const GET = async (request: Request) => {
  try {
    console.log("I am here");
    await connectToDB();
    const profileData = await Profile.find({})
      .populate({
        path: "projects",
        model: Project,
      })
      .populate({
        path: "playgrounds",
        model: Playground,
      })
      .populate({
        path: "certificates",
        model: Certificate,
      })
      .populate({
        path: "workExperience",
        model: WorkExperience,
      })
      .populate({
        path: "education",
        model: Education,
      })
      .exec();
    return NextResponse.json(profileData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch all Profile Information" },
      { status: 500 }
    );
  }
};
