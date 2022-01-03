const mongoose = require("mongoose");
const { Schema } = mongoose;

const Vehicle = new Schema(
  {
    color: {
      type: String,
      required: "Ingresar un color",
      uppercase: true,
    },
    description: {
      type: String,
      required: "Ingresar una descripción",
      uppercase: true,
    },
    direction: {
      type: String,
      required: "Ingresar una dirección",
      uppercase: true,
    },
    status: {
      type: String,
      required: "Ingresar un estado",
      uppercase: true,
    },

    brand: {
      type: String,
      required: "Ingresar una marca",
      uppercase: true,
    },
    model: {
      type: String,
      required: "Ingresar un modelo",
      uppercase: true,
    },
    regularPrice: {
      type: Number,
      required: "Ingresar un precio de lista",
    },
    resellerPrice: {
      type: Number,
    },
    doors: Number,
    fuel: {
      type: String,
      required: "Ingresar un tipo de Combustible",
      uppercase: true,
    },
    aditionalItems: Array,
    images: Array,
    company: {
      type: String,
      required: "Para crear un vehículo debes asignarlo a una empresa",
      uppercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("vehicle", Vehicle);
