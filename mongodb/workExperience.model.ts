import { IWorkExperience } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const workExperienceSchema = new Schema<IWorkExperience>({
  title: String,
  companyName: String,
  location: String,
  startDate: Date,
  endDate: Date,
  present: Boolean,
  description: String,
  visibility: {
    type: Boolean,
    default: true
  }
});

const WorkExperience =
  mongoose.models.WorkExperience ||
  mongoose.model("WorkExperience", workExperienceSchema);

export default WorkExperience;
