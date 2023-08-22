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
  followersAndFollowing: Boolean,
  xp: Boolean,
  achievementBadges: Boolean,
  socialLinks: Boolean,
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  playgrounds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Playground",
    },
  ],
  certificates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Certificate",
    },
  ],
  techStacks: [String],
  workExperience: [
    {
      type: Schema.Types.ObjectId,
      ref: "WorkExperience",
    },
  ],
  education: [
    {
      type: Schema.Types.ObjectId,
      ref: "Education",
    },
  ],
  interests: [String],
  languages: [String],
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
