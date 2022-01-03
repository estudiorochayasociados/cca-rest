const express = require("express");
const UserController = require("../controller/UserController");
const Middelware = require("../config/Middleware");
const jwt = require("jsonwebtoken");
const router = express.Router();
const cors = require("cors");

router.get("/", Middelware.checkToken, async (req, res) => {
  await UserController.list(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", Middelware.checkToken, async (req, res) => {
  await UserController.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", async (req, res) => {
  await UserController.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/", Middelware.checkToken, async (req, res) => {
  await UserController.update(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", Middelware.checkToken, async (req, res) => {
  await UserController.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/auth", cors("*"), async (req, res) => {
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
