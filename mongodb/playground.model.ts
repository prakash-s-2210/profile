import { IPlayground } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const playgroundSchema = new Schema<IPlayground>({
  title: String,
  technology: String,
  createdAt: Date,
  updatedAt: Date,
  visibility: {
    type: Boolean,
    default: true
  }
});

const Playground =
  mongoose.models.Playground || mongoose.model("Playground", playgroundSchema);

export default Playground;
