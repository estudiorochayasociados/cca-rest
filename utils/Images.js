const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const sharp = require("sharp");

const config = process.env.CLOUDINARY_NAME
  ? process.env
  : require("dotenv").config().parsed;
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

exports.upload = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, function (error, result) {
      resolve(result);
    });
  });
};

exports.uploads = (files_input) => {
  return new Promise(async (resolve, reject) => {
    const urls = [];
    const files = files_input;
    for (const file of files) {
      await this.resize(file);
      const newPath = await this.upload('./uploads/r_' + file.filename);
      urls.push(newPath);
      fs.unlinkSync(file.path);
      fs.unlinkSync('./uploads/r_' + file.filename);
    }
    resolve(urls);
  });
};

exports.resize = (file) => {
  return new Promise(async (resolve, reject) => {
    sharp(file.path).resize({
      fit: sharp.fit.contain,
      width: 800
    }).jpeg().toFile('./uploads/r_' + file.filename, (err, res) => {
      resolve(res);
    })
  });
};


exports.deleteAll = (images) => {
  return new Promise((resolve, reject) => {
    for (const image of images) {
      cloudinary.uploader.destroy(image.public_id, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    }
    resolve(1);
  });
};

exports.delete = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    resolve(1);
  });
};