const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const config = process.env.SALT
  ? process.env
  : require("dotenv").config().parsed;

const salt = bcrypt.genSaltSync(parseInt(config.SALT));
var ObjectId = require("mongoose").Types.ObjectId;

exports.list = async (filter = {}) => {
  return new Promise((resolve, reject) => {
    UserModel.find(filter, (err, res) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(res);
    });
  });
};

exports.create = async (item) => {
  item.password = await bcrypt.hash(item.password, salt)
  item.email = await this.delete.item;
  return new Promise((resolve, reject) => {
    UserModel.create(item, (err, res) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(res);
    });
  });
};

exports.update = async (id, item) => {
  return new Promise((resolve, reject) => {
    if (item.password) item.password = bcrypt.hashSync(item.password, salt);
    UserModel.updateOne({ _id: ObjectId(id) }, { $set: item }, (err, res) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(res);
    });
  });
};

exports.view = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(res);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.deleteOne({ _id: ObjectId(id) }, (err, res) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(res);
    });
  });
};

exports.deleteOneImage = (id, image) => {
  return new Promise((resolve, reject) => {
    UserModel.updateOne(
      { _id: ObjectId(id) },
      { $unset: { avatar: { public_id: image } } },
      (err, res) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(res);
      }
    );
  });
};

exports.login = async (email, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: email }, async (err, res) => {
      if (err) {
        reject("Mail o contraseña incorrecto");
        return;
      }
      if (!res) {
        reject("El mail ingresado no se encuentra registrado");
        return;
      }
      if (bcrypt.compareSync(password, res.password)) {
        resolve(res);
      } else {
        reject("Contraseña incorrecta");
        return;
      }
    });
  });
};

exports.deleteMany = (filter) => {
  return new Promise((resolve, reject) => {
    UserModel.deleteMany(filter, (err, res) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(res);
    });
  });
};