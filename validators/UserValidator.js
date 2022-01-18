const { check, validationResult } = require("express-validator");

exports.validateRequest = [
  check(["name", "surname", "email", "password", "role", "company"])
    .optional()
    .isString()
    .withMessage("El campo debe ser de tipo String"),
  check("status")
    .optional()
    .isBoolean()
    .withMessage("Status debe ser Booleano (true/false)"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  },
];
