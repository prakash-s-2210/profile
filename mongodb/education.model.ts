import { IEducation } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const educationSchema = new Schema<IEducation>({
  name: String,
  location: String,
  qualification: String,
  startDate: Date,
  endDate: Date,
  present: Boolean,
  description: String,
  visibility: {
    type: Boolean,
    default: true
  }
});

const Education =
  mongoose.models.Education || mongoose.model("Education", educationSchema);

export default Education;
