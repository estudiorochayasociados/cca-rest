const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    avatar: Map,
    email: {
      type: String,
      index: { unique: true },
      required: true,
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "company"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("user", User);
