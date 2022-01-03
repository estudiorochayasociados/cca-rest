const express = require("express");
const VehiclesBrands = require("../controller/VehiclesBrandsController");
const Middleware = require("../config/Middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  await VehiclesBrands.list(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", async (req, res) => {
  await VehiclesBrands.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", Middleware.checkToken, async (req, res) => {
  await VehiclesBrands.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", Middleware.checkToken, async (req, res) => {
  await VehiclesBrands.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", Middleware.checkToken, async (req, res) => {
  await VehiclesBrands.update(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
