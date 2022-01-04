const VehicleModel = require("../model/VehicleModel");
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = async (filter = {}, limit, page) => {
  return new Promise((resolve, reject) => {
    VehicleModel.paginate(filter, { limit, page }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.create = (item) => {
  return new Promise((resolve, reject) => {
    VehicleModel.create(item, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.update = (id, item) => {
  return new Promise((resolve, reject) => {
    VehicleModel.updateOne(
      { _id: ObjectId(id) },
      { $set: item },
      (err, res) => {
        if (err) reject(err.message);
        resolve(res);
      }
    );
  });
};

exports.deleteOneImage = (id, image) => {
  console.log(id, image);
  return new Promise((resolve, reject) => {
    VehicleModel.updateOne(
      { _id: ObjectId(id) },
      { $pull: { images: { public_id: image } } },
      (err, res) => {
        if (err) reject(err.message);
        resolve(res);
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    VehicleModel.deleteOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.view = (id) => {
  return new Promise((resolve, reject) => {
    VehicleModel.findOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};
