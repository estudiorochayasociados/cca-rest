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
    avatar: String,
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
    company: [{ type: Schema.Types.ObjectId, ref: "Company" }],
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

// User.pre("save", async function save(next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//     this.password = await bcrypt.hash(this.password, salt);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// User.methods.validatePassword = async function validatePassword(data) {
//   return bcrypt.compare(data, this.password);
// };

User.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  }
}),

module.exports = mongoose.model("user", User);
