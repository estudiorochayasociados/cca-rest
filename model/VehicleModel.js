const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
    transmission: {
      type: String,
      required: "Ingresar la transmisión del vehículo",
      uppercase: true,
    },
    kilometers: {
      type: Number,
      required: "Ingresar los kilómetros del vehículo",
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
    additionalItems: Array,
    images: Array,
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    status_publication: {
      type: String,
      required: "Ingresar un estado",
      uppercase: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

Vehicle.plugin(mongoosePaginate);


module.exports = mongoose.model("vehicle", Vehicle);
