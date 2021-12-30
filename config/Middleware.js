const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "456c103f26656ae321cc8437317174bd", (err, decoded) => {
      if (err) {
        return res.json({ message: "Token inválida" });
      } else {
        next();
      }
    });
  } else {
    res.send({
      message: "Token no proveída.",
    });
  }
};
