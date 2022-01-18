const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongodb = require("./config/MongoDB");
const _app = express();

//settings
_app.use(morgan("dev"));
_app.use(express.urlencoded({ extended: true }));
_app.use(express.json());
_app.use(cors());

_app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", '*');
  res.header("Access-Control-Allow-Methods", '*');
  res.header("Access-Control-Allow-Headers", '*');
  next();
});

_app.listen(process.env.PORT || 3000);
//Routes

_app.use("/vehicle", require("./routes/VehicleRoute"));
_app.use("/user", require("./routes/UserRoute"));
_app.use("/company", require("./routes/CompanyRoute"));
_app.use("/brands", require("./routes/VehiclesBrandsRoute"));
_app.use("/form", require("./routes/VehicleFormRoute"));
_app.use("/service", require("./routes/ServiceRoute"));
