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
    currency:{
      type: String,
      required: "Ingresar un tipo de moneda",
      enum: ['ARS', 'USD'],
      uppercase: true,
    },
    year:{
      type: Number,
      required: "Ingresa un año",
      uppercase: true,
    },
    engine:{
      type: String,
      required: "Ingresa un tipo de motor",
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
      required: "Ingresar un estado"
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
      required: "Ingresar un estado de publicación",
      enum: ['PUBLICADO', 'NO PUBLICADO', 'EN REVISIÓN'],
      uppercase: true
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

Vehicle.plugin(mongoosePaginate);


module.exports = mongoose.model("vehicle", Vehicle);
