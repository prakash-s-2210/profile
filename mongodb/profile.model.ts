import { IProfile } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const profileSchema = new Schema<IProfile>({
  name: String,
  profilePicture: String,
  headline: String,
  location: String,
  about: String,
  profession: String,
  dob: Date,
  gender: String,
  followings: Number,
  followers: Number,
  github: String,
  linkedin: String,
  facebook: String,
  instagram: String,
  dribble: String,
  behance: String,
  youtube: String,
  gmail: String,
  projects: [
    {
      title: String,
      technology: String,
      githubLink: String,
      picture: String,
      createdAt: Date,
      updatedAt: Date,
    },
  ],
  playgrounds: [
    {
      title: String,
      technology: String,
      createdAt: Date,
      updatedAt: Date,
    },
  ],
  certificates: [
    {
      title: String,
      technology: String,
      issuedDate: Date,
      credentials: String,
    },
  ],
  techStacks: [String],
  workExperience: [
    {
      companyName: String,
      location: String,
      startDate: Date,
      endDate: Date,
      present: Boolean,
      description: String,
    },
  ],
  education: [
    {
      name: String,
      location: String,
      qualification: String,
      startDate: Date,
      endDate: Date,
      present: Boolean,
      description: String,
    },
  ],
  interests: [String],
  languages: [String],
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
