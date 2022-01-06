const express = require("express");
const VehicleController = require("../controller/VehicleController");
const Middleware = require("../config/Middleware");
const MulterController = require("../utils/Multer");
const ImagesController = require("../utils/Images");
const router = express.Router();

router.get("/", Middleware.checkToken, async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  await VehicleController.list(req.body, limit, page)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
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
  MulterController.fields([{name:"images", maxCount: 10}]),
  async (req, res) => {
    if (req.files.images) {
      req.body.images = await ImagesController.uploadMany(req.files.images);
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
  MulterController.fields([{name:"images", maxCount: 10}]),
  async (req, res) => {
    const vehicle = await VehicleController.view(req.params.id);
    if (req.files.images) {
      req.body.images = [...vehicle.images,...await ImagesController.uploadMany(req.files.images)];
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
