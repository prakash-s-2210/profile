import { IProject } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const projectSchema = new Schema<IProject>({
  title: String,
  technology: String,
  githubLink: String,
  picture: String,
  createdAt: Date,
  updatedAt: Date,
  visibility: {
    type: Boolean,
    default: true,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
