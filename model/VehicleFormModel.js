const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehicleForm = new Schema(
  {
    name: {
      type: String,
      required: "Ingresar una nombre",
      unique: true
    },
    options: {
      type: Array,
      required: "Ingresar las opciones",
      uppercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("vehicles_forms", VehicleForm);
