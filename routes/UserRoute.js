const express = require("express");
const UserController = require("../controller/UserController");
const Middleware = require("../config/Middleware");
const MulterController = require("../utils/Multer");
const ImagesController = require("../utils/Images");
const UserValidator = require("../validators/UserValidator");
const jwt = require("jsonwebtoken");
const router = express.Router();

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
        req.body.avatar = (await ImagesController.uploads(req.files.avatar))[0];
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
    const view = await UserController.view(req.params.id);

    await UserController.delete(req.params.id)
      .then(async (data) => {
        await ImagesController.delete(view.avatar.get('public_id'));
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
        role: data.role,
        company: data.company,
        email: data.email,
        avatar: (data.avatar) ? data.avatar.get('url') : 'https://res.cloudinary.com/estudio-rocha/image/upload/v1642779901/sin_avatar_e1raga.png',
        id: data._id,
        status: data.status,
      };
      res.status(200).json(dataResponse);
    })
    .catch((err) => {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    });
});

module.exports = router;
