const express = require("express");
const UserController = require("../controller/UserController");
const Middleware = require("../config/Middleware");
const MulterController = require("../utils/Multer");
const ImagesController = require("../utils/Images");
const UserValidator = require("../validators/UserValidator");
const jwt = require("jsonwebtoken");
const router = express.Router();

const bcrypt = require("bcrypt");
const config = process.env.SALT
  ? process.env
  : require("dotenv").config().parsed;

const salt = bcrypt.genSaltSync(parseInt(config.SALT));

router.get(
  "/",
  Middleware.checkToken,
  UserValidator.validateRequest,
  async (req, res) => {
    await UserController.list(req.query)
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
  UserValidator.validateRequest,
  async (req, res) => {
    let id = req.params.id.toString();
    await UserController.view(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
);

router.post(
  "/",
  MulterController.fields([{ name: "avatar", maxCount: 1 }]),
  async (req, res) => {
    if (req.files) {
      if (req.files.avatar) {
        req.body.avatar = (await ImagesController.uploads(req.files.avatar))[0];
      }
    }
    await UserController.create(req.body)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log("ERROR =>", err);
        res.status(500).json({ error: err });
      });
  }
);

router.put(
  "/:id",
  Middleware.checkToken,
  UserValidator.validateRequest,
  MulterController.fields([{ name: "avatar", maxCount: 1 }]),
  async (req, res) => {
    const view = await UserController.view(req.params.id);
    if (req.files) {
      if (req.files.avatar) {
        const avatar = await ImagesController.uploads(req.files.avatar);
        req.body.avatar = avatar[0];
        if (view.avatar) await ImagesController.deleteAll(view.avatar);
      }
    }
    await UserController.update(req.params.id, req.body)
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
  UserValidator.validateRequest,
  async (req, res) => {
    console.log("ID =>", req.params.id);
    const view = await UserController.view(req.params.id);

    console.log("View =>", view);

    await UserController.delete(req.params.id)
      .then(async (data) => {
        await ImagesController.deleteAll(view.avatar);
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
  UserValidator.validateRequest,
  async (req, res) => {
    await ImagesController.delete(req.params.id_cloudinary)
      .then(async (data) => {
        console.log(data);
        await UserController.deleteOneImage(
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

router.post("/auth", async (req, res) => {
  await UserController.login(req.body.email, req.body.password)
    .then(async (data) => {
      let dataResponse = {
        message: "Autenticación correcta",
        token: jwt.sign({ check: true }, process.env.JWT, {
          expiresIn: "10h",
        }),
        name: data.name,
        surname: data.surname,
        role: await bcrypt.hash(data.role, salt),
        company: data.company,
        email: data.email,
        id: data._id,
      };
      res.status(200).json(dataResponse);
    })
    .catch((err) => {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    });
});

module.exports = router;
