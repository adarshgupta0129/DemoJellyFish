const express = require('express');
const authorRoute = require("../controller/author");
const taskRoute = require("../controller/task");
const timerRoute = require("../controller/timer");

var app = express();

app.use("/author", authorRoute);
app.use("/task", taskRoute);
app.use("/timer", timerRoute);

module.exports = app;