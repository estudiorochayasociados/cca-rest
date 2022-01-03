const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehiclesBrands = new Schema(
  {
    brand: {
      type: String,
      required: "Ingresar una marca",
      uppercase: true,
      unique: true
    },
    models: {
      type: Array,
      required: "Ingresar un modelo",
      uppercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("vehicles_brands", VehiclesBrands);
