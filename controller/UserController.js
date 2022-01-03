const UserModel = require("../model/UserModel");

exports.list = async (filter = {}) => {
  return new Promise((resolve, reject) => {
    UserModel.find(filter, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.create = (item) => {
  return new Promise((resolve, reject) => {
    UserModel.create(item, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.update = (id, item) => {
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

exports.login = function (email, password) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: email, password: password }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};
