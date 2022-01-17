const mongoose = require("mongoose");
const { array } = require("../utils/Multer");
const { Schema } = mongoose;

var notEmpty = function (features) {
  if (features.length === 0) {
    return false;
  } else {
    return true;
  }
};

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
    account: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Company.pre("updateOne", function (next) {
//   var item = this;
//   console.log(item);
//   if (this._update.$set.phones) this._update.$set.phones = this._update.$set.phones.filter((n) => n);
//   if (this._update.$set.email) this._update.$set.emails = this._update.$set.emails.filter((n) => n);
//   if (this._update.$set.addresses) this._update.$set.emails = this._update.$set.emails.filter((n) => n);
//   console.log(item);
//   next();
// });

module.exports = mongoose.model("company", Company);
