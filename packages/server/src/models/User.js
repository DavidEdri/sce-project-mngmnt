import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      default: 1,
    },
    manages: {
      type: Schema.Types.ObjectId,
      ref: "facilities",
    },
    avatar: {
      type: Buffer,
    },
    active: {
      type: Boolean,
      default: false,
    },
    activateToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    favorites: [String],
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (e, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

export default mongoose.model("users", UserSchema);
