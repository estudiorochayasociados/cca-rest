const express = require("express");
const VehicleController = require("../controller/VehicleController");
const ImagesController = require("../controller/ImagesController");
const Middleware = require("../config/Middleware");
const router = express.Router();
const upload = require("../utils/multer");
const fs = require("fs");

router.get("/", Middleware.checkToken, async (req, res) => {
  await VehicleController.list(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", Middleware.checkToken, async (req, res) => {
  await VehicleController.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", Middleware.checkToken, async (req, res) => {
  await VehicleController.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post(
  "/",
  Middleware.checkToken,
  upload.array('images',10),
  async (req, res) => {
    const uploader = async (path) => await ImagesController.uploads(path,'vehicles');

    const urls = [];

    const files = req.files;

    console.log(files);
    for(const file of files){
      const {path} = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json(urls);


    // console.log(req.file, req.body);
    // req.body.images = req.files ? await ImagesController.create(req.files) : [];

    // console.log(req.body);
    // await VehicleController.create(req.body)
    //   .then((data) => {
    //     res.status(200).json(data);
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err });
    //   });
  }
);

router.put("/:id", Middleware.checkToken, async (req, res) => {
  await VehicleController.update(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
