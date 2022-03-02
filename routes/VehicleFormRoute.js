const express = require("express");
const VehicleForm = require("../controller/VehicleFormController");
const Middleware = require("../config/Middleware");

const router = express.Router();

router.get("/", Middleware.checkToken, async (req, res) => {
  await VehicleForm.list(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", Middleware.checkToken, async (req, res) => {
  await VehicleForm.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", Middleware.checkToken, async (req, res) => {
  await VehicleForm.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", Middleware.checkToken, async (req, res) => {
  await VehicleForm.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", Middleware.checkToken, async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  await VehicleForm.update(req.params.id, req.body)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("ERROR", err)
      res.status(500).json({ error: err });
    });
});

module.exports = router;
