const CompanyModel = require("../model/CompanyModel");
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = async (filter = {}) => {
  return new Promise((resolve, reject) => {
    CompanyModel.find(filter, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.create = (item) => {
  return new Promise((resolve, reject) => {
    CompanyModel.create(item, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.update = (id, item) => {
  return new Promise((resolve, reject) => {
    CompanyModel.updateOne(
      { _id: ObjectId(id) },
      { $set: item },
      (err, res) => {
        if (err) reject(err.message);
        resolve(res);
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    CompanyModel.deleteOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.deleteOneImage = (id, image) => {
  console.log(id, image);
  return new Promise((resolve, reject) => {
    CompanyModel.updateOne(
      { _id: ObjectId(id) },
      { $pull: { images: { public_id: image }, logo: { public_id: image } } },
      (err, res) => {
        if (err) reject(err.message);
        resolve(res);
      }
    );
  });
};

exports.view = (id) => {
  return new Promise((resolve, reject) => {
    CompanyModel.findOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};
