const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const config = process.env.CLOUDINARY_NAME
  ? process.env
  : require("dotenv").config().parsed;
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

exports.uploads = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, function (error, result) {
      resolve(result);
    });
  });
};

exports.uploadMany = (files_input) => {
  return new Promise(async (resolve, reject) => {
    // const uploader = async (path) => await this.uploads(path);
    const urls = [];
    const files = files_input;
    console.log(files);
    for (const file of files) {
      console.log(file.fieldname);
      const newPath = await this.uploads(file.path);
      urls.push(newPath);
      console.log(file.path);
      fs.unlinkSync(file.path);
    }

    resolve(urls);
  });
};

exports.deleteAll = (images) => {
  return new Promise((resolve, reject) => {
    for (const image of images) {
      cloudinary.uploader.destroy(image.public_id, function (error, result) {});
    }
    resolve(1);
  });
};

exports.delete = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, function (error, result) {});
    resolve(1);
  });
};
