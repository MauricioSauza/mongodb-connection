const express = require("express");

require("dotenv").config();
const errors = require("./helpers/network/errors");

const { config } = require("./config");
require("./database/config").dbConnection(config.mongodb.db);

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api", require("./networks/index"));

app.use(errors);
app.listen(config.ventas.port, () => {
  console.log("Servidor escuchando en el puerto", config.ventas.port);
});
