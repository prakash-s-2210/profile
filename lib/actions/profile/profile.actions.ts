// Get Profile Information
"use server";

import Profile from "@/mongodb/profile.model";
import { connectToDB } from "@/lib/mongoose";
import Project from "@/mongodb/project.model";
import Playground from "@/mongodb/playground.model";
import Certificate from "@/mongodb/certificate.model";
import WorkExperience from "@/mongodb/workExperience.model";
import Education from "@/mongodb/education.model";

export const getProfileData = async () => {
  try {
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
      .limit(1)
      .exec();
    return JSON.parse(JSON.stringify(profileData));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
