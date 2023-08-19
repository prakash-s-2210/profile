"use server";

import { connectToDB } from "@/lib/mongoose";
import Playground from "@/mongodb/playground.model";
import Profile from "@/mongodb/profile.model";
import Project from "@/mongodb/project.model";
import { IUpdatePortfolioParams, IUpdateProfileParams, IUpdateSocialsParams } from "@/types";

export async function updateProfile({
  name,
  profilePicture,
  headline,
  location,
  about,
  profession,
  dob,
  gender,
  visibility,
  id,
}: IUpdateProfileParams) {
  try {
    connectToDB();

    const profileUpdated = await Profile.findOneAndUpdate(
      { _id: id },
      { name, profilePicture, headline, location, about, profession, dob, gender, visibility }
    ).exec();

    if (!profileUpdated) {
      throw new Error("Profile Information not found");
    }

    return profileUpdated;
  } catch (error) {
    console.error("Error updating profile information:", error);
    throw error;
  }
}

export async function updateSocials({
  github,
  linkedin,
  facebook,
  instagram,
  dribble,
  behance,
  youtube,
  gmail,
  id,
}: IUpdateSocialsParams) {
  try {
    connectToDB();

    const profileUpdated = await Profile.findOneAndUpdate(
      { _id: id },
      { github, linkedin, facebook, instagram, dribble, behance, youtube, gmail }
    ).exec();

    if (!profileUpdated) {
      throw new Error("Profile Information not found");
    }

    return profileUpdated;
  } catch (error) {
    console.error("Error updating profile information:", error);
    throw error;
  }
}

export async function updatePortfolio({
  projects,
  playgrounds
}: IUpdatePortfolioParams) {
  try {
    connectToDB();

    for (const project of projects) {
      const filter = { _id: project._id };
      const update = { $set: { visibility: project.visibility } };

      await Project.updateOne(filter, update);
    }

    for (const playground of playgrounds) {
      const filter = { _id: playground._id };
      const update = { $set: { visibility: playground.visibility } };

      await Playground.updateOne(filter, update);
    }

  } catch (error) {
    console.error("Error updating profile information:", error);
    throw error;
  }
}
