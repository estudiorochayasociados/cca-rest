const { check, validationResult } = require("express-validator");
 
exports.validateRequest = [
  check([
    "name",
    "logo",
    "images",
    "description",
    "addresses",
    "phones",
    "email",
    "account",
  ])
    .optional()
    .not()
    .isEmpty()
    .withMessage("Campo obrigatório"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403).send({ errors: err.array() });
    }
  },
]; 