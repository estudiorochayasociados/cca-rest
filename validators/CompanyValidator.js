const { check, validationResult } = require("express-validator");

exports.validateRequest = [
  check("logo")
    .optional()
    .isObject()
    .withMessage("El campo debe ser de tipo:Object"),
  ,
  check(["images", "addresses", "phones", "email"])
    .optional()
    .isArray()
    .withMessage("El campo debe ser de tipo:Array"),
  check(["name", "description", "account"])
    .optional()
    .isString()
    .withMessage("El campo debe ser de tipo:String"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  },
];
