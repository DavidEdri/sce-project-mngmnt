import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: "facility",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("reports", ReportSchema);
