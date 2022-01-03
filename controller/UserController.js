const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const config = process.env.SALT
  ? process.env
  : require("dotenv").config().parsed;

const salt = bcrypt.genSaltSync(parseInt(config.SALT));

exports.list = async (filter = {}) => {
  return new Promise((resolve, reject) => {
    UserModel.find(filter, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.create = async (item) => {
  item.password = await bcrypt.hash(item.password, salt);
  console.log(item.password);
  return new Promise((resolve, reject) => {
    UserModel.create(item, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.update = async (id, item) => {
  item.password ? bcrypt.hashSync(item.password, salt) : "";
  return new Promise((resolve, reject) => {
    UserModel.updateOne({ _id: ObjectId(id) }, { $set: item }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.view = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.deleteOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.login = async (email, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: email }, async (err, res) => {
      if (bcrypt.compareSync(password, res.password)) {
        resolve(res);
      } else {
        reject("Contraseña incorrecta");
      }
    });
  });
};
