const VehicleModel = require("../model/VehicleModel");
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = async (filter, limit, page) => {
  return new Promise((resolve, reject) => {
    VehicleModel.paginate(
      filter,
      { limit, page, populate: { path: "company", select: "name" } },
      (err, res) => {
        if (err) reject(err.message);
        resolve(res);
      }
    );
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
    VehicleModel.findOne({ _id: ObjectId(id) })
      .populate("company")
      .exec((err, res) => {
        if (err) reject(err.message);
        resolve(res);
      });
  });
};

exports.filter = async (filter = {}) => {
  return new Promise(async (resolve, reject) => {
    let response = {};
    await VehicleModel.distinct("model", filter, (error, result) => {
      response.model = result;
    });
    await VehicleModel.distinct("brand", filter, (error, result) => {
      response.brand = result;
    });
    await VehicleModel.distinct("fuel", filter, (error, result) => {
      response.fuel = result;
    });
    await VehicleModel.distinct("status", filter, (error, result) => {
      response.status = result;
    });
    await VehicleModel.distinct("doors", filter, (error, result) => {
      response.doors = result;
    });
    await VehicleModel.distinct("color", filter, (error, result) => {
      response.color = result;
    });
    await VehicleModel.distinct("direction", filter, (error, result) => {
      response.direction = result;
    });
    await VehicleModel.distinct("transmission", filter).then((result) => {
      response.transmission = result;
      resolve(response);
    });
    await VehicleModel.distinct("engine", filter).then((result) => {
      response.engine = result;
      resolve(response);
    });
    await VehicleModel.distinct("year", filter).then((result) => {
      response.year = result;
      resolve(response);
    });
    await VehicleModel.distinct("currency", filter).then((result) => {
      response.currency = result;
      resolve(response);
    });
  });
};

exports.updateMany = (filter, toSet) => {
  return new Promise((resolve, reject) => {
    VehicleModel.updateMany(filter, { $set: toSet }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.deleteMany = (filter) => {
  return new Promise((resolve, reject) => {
    VehicleModel.deleteMany(filter, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};