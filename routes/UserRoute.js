const express = require("express");
const UserController = require("../controller/UserController");
const Middleware = require("../config/Middleware");
const MulterController = require("../utils/Multer");
const ImagesController = require("../utils/Images");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", Middleware.checkToken, async (req, res) => {
  await UserController.list(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", Middleware.checkToken, async (req, res) => {
  await UserController.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post(
  "/",
  MulterController.fields([{ name: "avatar", maxCount: 1 }]),
  async (req, res) => {
    if (req.files) {
      req.body.avatar = await ImagesController.uploadMany(req.files.avatar)[0];
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
  MulterController.fields([{ name: "avatar", maxCount: 1 }]),
  async (req, res) => {
    const view = await UserController.view(req.params.id);
    if (req.files.avatar) {
      const avatar = await ImagesController.uploadMany(req.files.avatar);
      req.body.avatar = avatar;
      if (view.avatar) await ImagesController.deleteAll(view.avatar);
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

router.delete("/:id", Middleware.checkToken, async (req, res) => {
  const view = await UserController.view(req.params.id);

  await UserController.delete(req.params.id)
    .then(async (data) => {
      await ImagesController.deleteAll(view.avatar);
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
    .then((data) => {
      console.log(data);
      let dataResponse = {
        message: "Autenticación correcta",
        token: jwt.sign({ check: true }, process.env.JWT, {
          expiresIn: "10h",
        }),
      };
      res.status(200).json(dataResponse);
    })
    .catch((err) => {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    });
});

module.exports = router;
