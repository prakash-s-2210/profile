import { ICertificate } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const certificateSchema = new Schema<ICertificate>({
  title: String,
  technology: String,
  issuedDate: Date,
  credentials: String,
  visibility: {
    type: Boolean,
    default: true
  }
});

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);

export default Certificate;
