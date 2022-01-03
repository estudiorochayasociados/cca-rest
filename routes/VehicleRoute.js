const express = require("express");
const VehicleController = require("../controller/VehicleController");
const ImagesController = require("../controller/ImagesController");
const Middleware = require("../config/Middleware");
const router = express.Router();
const upload = require("../utils/Multer");

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
  const view = await VehicleController.view(req.params.id);
  await VehicleController.delete(req.params.id)
    .then(async (data) => {
      await ImagesController.deleteAll(view.images);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete(
  "/image/:id/:id_cloudinary",
  Middleware.checkToken,
  async (req, res) => {
    await ImagesController.delete(req.params.id_cloudinary)
      .then(async (data) => {
        console.log(data);
        await VehicleController.deleteOneImage(
          req.params.id,
          req.params.id_cloudinary
        );
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.post(
  "/",
  Middleware.checkToken,
  upload.array("images", 10),
  async (req, res) => {
    if (req.files) {
      req.body.images = await ImagesController.uploadMany(req.files);
    }
    await VehicleController.create(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.put(
  "/:id",
  Middleware.checkToken,
  upload.array("images", 10),
  async (req, res) => {
    if (req.files) {
      req.body.images.concat(await ImagesController.uploadMany(req.files));
    }
    await VehicleController.update(req.params.id, req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

module.exports = router;
