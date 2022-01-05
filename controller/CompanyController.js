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
      // { $set: item, $unset: { phones: "" } },
      {  $set: { phones: [] } },
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
  return new Promise(async (resolve, reject) => {
    await CompanyModel.findOneAndUpdate(
      { _id: ObjectId(id), "logo.public_id": image },
      {
        logo: {},
      },
      (err, res) => {
        if (err) reject(err.message);
      }
    );
    await CompanyModel.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $pull: { images: { public_id: image } },
      },
      (err, res) => {
        if (err) reject(err.message);
      }
    );

    await CompanyModel.find({ _id: ObjectId(id) }, (err, res) => {
      resolve(res);
    });
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
