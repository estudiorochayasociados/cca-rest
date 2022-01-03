const express = require("express");
const CompanyController = require("../controller/CompanyController");
const Middleware = require("../config/Middleware");

const router = express.Router();

router.get("/", Middleware.checkToken, async (req, res) => {
  console.log(req.body);
  const get = await CompanyController.list(req.body);
  res.status(200).send(get);
});

router.get("/:id", Middleware.checkToken, async (req, res) => {
  await CompanyController.view(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", Middleware.checkToken, async (req, res) => {
  await CompanyController.delete(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", Middleware.checkToken, async (req, res) => {
  await CompanyController.create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", Middleware.checkToken, async (req, res) => {
  await CompanyController.update(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
