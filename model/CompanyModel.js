const mongoose = require("mongoose");
const { Schema } = mongoose;

const Company = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    logo: String,
    images: Array,
    description: String,
    addresses: Array,
    phones: Array,
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Company", Company);
