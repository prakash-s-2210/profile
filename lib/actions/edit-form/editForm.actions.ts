"use server";

import { connectToDB } from "@/lib/mongoose";
import Playground from "@/mongodb/playground.model";
import Profile from "@/mongodb/profile.model";
import Project from "@/mongodb/project.model";
import {
  IUpdatePortfolioParams,
  IUpdateProfileParams,
  IUpdateSocialsParams,
  IUpdateResumeParams,
} from "@/types";

// Update Profile Form

export async function updateProfile({
  name,
  profilePicture,
  headline,
  location,
  about,
  profession,
  dob,
  gender,
  followersAndFollowing,
  xp,
  achievementBadges,
  id,
}: IUpdateProfileParams) {
  try {
    connectToDB();

    const profileUpdated = await Profile.findOneAndUpdate(
      { _id: id },
      {
        name,
        profilePicture,
        headline,
        location,
        about,
        profession,
        dob,
        gender,
        followersAndFollowing,
        xp,
        achievementBadges,
      }
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

// Update Socials form

export async function updateSocials({
  github,
  linkedin,
  facebook,
  instagram,
  dribble,
  behance,
  youtube,
  gmail,
  socialLinks,
  id,
}: IUpdateSocialsParams) {
  try {
    connectToDB();

    const profileUpdated = await Profile.findOneAndUpdate(
      { _id: id },
      {
        github,
        linkedin,
        facebook,
        instagram,
        dribble,
        behance,
        youtube,
        gmail,
        socialLinks,
      }
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

// Update portfolio form

export async function updatePortfolio({
  projects,
  playgrounds,
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

// Update resume form

export async function updateResume({
  techStacks,
  interests,
  languages,
  id,
}: IUpdateResumeParams) {
  try {
    connectToDB();

    const profileUpdated = await Profile.findOneAndUpdate(
      { _id: id },
      {
        techStacks,
        interests,
        languages,
        id,
      }
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
