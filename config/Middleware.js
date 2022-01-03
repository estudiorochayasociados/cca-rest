const jwt = require("jsonwebtoken");
const config = process.env.MONGO_DB
  ? process.env
  : require("dotenv").config().parsed;

exports.checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.JWT, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Token desactualizado" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No tienes autorización" });
  }
};
