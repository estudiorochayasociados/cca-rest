const express = require("express");
const Middleware = require("../config/Middleware");

const router = express.Router();

router.get("/token", Middleware.checkToken, async (req, res) => {
    res.status(200).json({ status: true });
});

module.exports = router;
