const express = require("express");
const VehicleController = require("../controller/VehicleController");
const Middleware = require("../config/Middleware");

const router = express.Router();

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

router.post("/", Middleware.checkToken, async (req, res) => {
  await VehicleController.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

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
