const VehicleForm = require("../model/VehicleFormModel");
var ObjectId = require("mongoose").Types.ObjectId;
const VehicleController = require("../controller/VehicleController")

exports.list = async (filter = {}) => {
  return new Promise((resolve, reject) => {
    VehicleForm.find(filter, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.create = (item) => {
  return new Promise((resolve, reject) => {
    VehicleForm.create(item, (err, res) => {
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
      differences.options = response.options.filter(x => item.options.indexOf(x) === -1);
      olds = item.options.filter(x => response.options.indexOf(x) === -1);

      VehicleForm.updateOne(
        { _id: ObjectId(id) },
        { $set: item },
        (err, res) => {
          if (err) {
            reject(err.message);
          } else {
            if (differences.options.length > 0) {
              differences.options.forEach((element, key) => {
                let data = {};
                data[response.name] = element;
                let dataSet = {};
                dataSet[response.name] = olds[key];

                VehicleController.updateMany(data, dataSet);
                resolve(res);
              });
            }
          }
        }).catch((error) => {
          reject(error.message)
        });
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    VehicleForm.deleteOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};

exports.view = (id) => {
  return new Promise((resolve, reject) => {
    VehicleForm.findOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) reject(err.message);
      resolve(res);
    });
  });
};
