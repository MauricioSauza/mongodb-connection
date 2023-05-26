const express = require('express');
const app = express();

app.use("/persons", require("../components/persons/network"));
app.use("/sales", require("../components/sales/network"));

module.exports = app;