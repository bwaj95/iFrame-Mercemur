import mongoose from "mongoose";

const frameDataSchema = mongoose.Schema(
  {
    url: { type: String, required: true },
    origin: { type: String },
    host: { type: String },
    id: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

const FrameData = mongoose.model("FrameData", frameDataSchema);
export default FrameData;
