const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");

const { Auth } = require("./middlewares/auth");
const department = require("./routes/department");
const employee = require("./routes/employee");

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(formidable());
app.use(cookieParser());

const db = require("./models");
db.sequelize.sync();

// Auth
// app.use(Auth);
app.use("/api/v1/departments", department);
app.use("/api/v1/employees", employee);

module.exports = app;
