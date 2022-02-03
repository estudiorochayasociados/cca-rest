const VehiclesBrands = require("../model/VehiclesBrandsModel");
var ObjectId = require("mongoose").Types.ObjectId;
const VehicleModel = require("../model/VehicleModel");
const VehicleController = require("../controller/VehicleController");

exports.list = async (filter = {}) => {
  return new Promise((resolve, reject) => {
    VehiclesBrands.find(filter, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.create = (item) => {
  return new Promise((resolve, reject) => {
    VehiclesBrands.create(item, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.update = (id, item) => {
  var differences = {};
  var olds = [];
  return new Promise((resolve, reject) => {
    this.view(id).then((response) => {
      if (response.name != item.name) {
        differences.name = response.name;
      }

      differences.options = response.options.filter(x => item.options.indexOf(x) === -1);
      olds = item.options.filter(x => response.options.indexOf(x) === -1);

      VehiclesBrands.updateOne(
        { _id: ObjectId(id) },
        { $set: item },
        (err, res) => {
          if (err) {
            reject(err.message);
          } else {
            if (differences.name) {
              VehicleController.updateMany({ brand: differences.name }, { "brand": item.name });
              if (differences.options.length > 0) {
                differences.options.forEach((element, key) => {
                  VehicleController.updateMany({ model: element }, { "model": olds[key] });
                  resolve(res);
                });
              } else {
                resolve(res);
              }
            } else {
              if (differences.options.length > 0) {
                differences.options.forEach((element, key) => {
                  VehicleController.updateMany({ model: element }, { "model": olds[key] });
                  resolve(res);
                });
              }
            }
          }
        }
      );
    }).catch((error) => {
      reject(error.message)
    })
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    VehiclesBrands.deleteOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.view = (id) => {
  return new Promise((resolve, reject) => {
    VehiclesBrands.findOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};
