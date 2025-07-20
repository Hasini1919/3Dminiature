import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    responses: {
      type: Map,
      of: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);

