import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("messages", MessageSchema);
