const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "estudio-rocha",
  api_key: "277513911695881",
  api_secret: "Bnrsp5To7QtseJrKFTKzj0QJYDc",
});

exports.uploads = (file) => {
  result = [];
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (data) => {
      console.log(data);
      result.push({ url: data.url, id: data.public_id });
    });
    resolve(result);
  });
};
