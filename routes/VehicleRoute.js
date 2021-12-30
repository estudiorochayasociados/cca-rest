const express = require("express");
const VehicleController = require("../controller/VehicleController");
const Middleware = require("../config/Middleware");

const router = express.Router();

router.get("/", Middleware.checkToken, async (req, res) => {
  console.log(req.body);
  const get = await VehicleController.list(req.body);
  res.status(200).send(get);
});

router.get("/:id", Middleware.checkToken, async (req, res) => {
  let data = await VehicleController.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", Middleware.checkToken, async (req, res) => {
  let data = await VehicleController.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", Middleware.checkToken, async (req, res) => {
  let data = await VehicleController.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", Middleware.checkToken, async (req, res) => {
  const get = await VehicleController.update(req.params.id, req.body);
  res.status(200).send({ get });
});

module.exports = router;
