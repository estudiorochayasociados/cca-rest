const express = require("express");
const CompanyController = require("../controller/CompanyController");
const MulterController = require("../utils/Multer");
const ImagesController = require("../utils/Images");
const Middleware = require("../config/Middleware");
const CompanyValidator = require("../validators/CompanyValidator");

const router = express.Router();

router.get(
  "/",
  Middleware.checkToken,
  CompanyValidator.validateRequest,
  async (req, res) => {
    await CompanyController.list(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.get(
  "/:id",
  Middleware.checkToken,
  CompanyValidator.validateRequest,
  async (req, res) => {
    await CompanyController.view(req.params.id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.delete(
  "/:id",
  Middleware.checkToken,
  CompanyValidator.validateRequest,
  async (req, res) => {
    const view = await CompanyController.view(req.params.id);
    await CompanyController.delete(req.params.id)
      .then(async (data) => {
        await ImagesController.deleteAll(view.images);
        await ImagesController.deleteAll([view.logo]);
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.delete(
  "/image/:id/:id_cloudinary",
  Middleware.checkToken,
  CompanyValidator.validateRequest,
  async (req, res) => {
    await ImagesController.delete(req.params.id_cloudinary)
      .then(async (data) => {
        console.log(data);
        const resFinal = await CompanyController.deleteOneImage(
          req.params.id,
          req.params.id_cloudinary
        );
        res.status(200).json(resFinal);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.post(
  "/",
  Middleware.checkToken,
  CompanyValidator.validateRequest,
  MulterController.fields([{ name: "images", maxCount: 10 }]),
  async (req, res) => {
    if (req.files) {
      if (req.files.images)
        req.body.images = await ImagesController.uploadMany(req.files.images);
    }

    if (req.body.logo) req.body.logo = JSON.parse(req.body.logo);
    await CompanyController.create(req.body)
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
  CompanyValidator.validateRequest,
  MulterController.fields([{ name: "images", maxCount: 10 }]),
  async (req, res) => {
    const company = await CompanyController.view(req.params.id);
    if (req.files) {
      if (req.files.images)
        req.body.images = [
          ...company.images,
          ...(await ImagesController.uploadMany(req.files.images)),
        ];
    }

    if (req.body.logo) req.body.logo = JSON.parse(req.body.logo);

    await CompanyController.update(req.params.id, req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

module.exports = router;
