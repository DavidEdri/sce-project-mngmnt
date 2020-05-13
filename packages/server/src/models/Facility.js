import mongoose, { Schema } from "mongoose";

const FacilitySchema = new Schema(
  {
    manager: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    fencing: {
      type: Boolean,
      required: true,
    },
    handicappe: {
      type: Boolean,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    ligthing: {
      type: Boolean,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    operator: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rating: {
      ratedBy: [Schema.Types.ObjectId],
      totalRate: {
        type: Number,
        default: 0,
      },
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    gallery: [Buffer],
  },
  { timestamps: true }
);

export default mongoose.model("facilities", FacilitySchema);
