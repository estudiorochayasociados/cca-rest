const mongoose = require("mongoose");
const { Schema } = mongoose;

const Company = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: "Necesito que pongas un nombre de tu empresa",
    },
    logo: Map,
    images: Array,
    description: String,
    addresses: Array,
    phones: Array,
    email: Array,
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
); 

module.exports = mongoose.model("company", Company);
