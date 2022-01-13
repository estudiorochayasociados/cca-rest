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
      required: true,
      validate: [isEmail, "invalid email"],
      createIndexes: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    status: {
      type: String,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("user", User);
