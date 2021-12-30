const express = require("express");
const config = require("dotenv").config();
// const Middelware = require("../config/Middleware");
const VehicleController = require("../controller/VehicleController");
const router = express.Router();

router.get("/", async (req, res) => {
  const get = await VehicleController.list();
  res.status(200).send(get);
});

router.get("/:id", async (req, res) => {
  let data = await VehicleController.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", async (req, res) => {
  let data = await VehicleController.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", async (req, res) => {
  let data = await VehicleController.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", async (req, res) => {
  const get = await VehicleController.update(req.params.id,req.body);
  res.status(200).send({ get });
});

module.exports = router;
