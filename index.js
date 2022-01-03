const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongodb = require("./config/MongoDB");
const app = express();

//settings
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.listen(process.env.PORT || 3000);
//Routes

app.use("/vehicle", require("./routes/VehicleRoute"));
app.use("/user", require("./routes/UserRoute"));
app.use("/company", require("./routes/CompanyRoute"));
app.use("/brands", require("./routes/VehiclesBrandsRoute"));
