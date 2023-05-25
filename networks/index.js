// /api

const express = require('express');
const app = express();
app.use('/test/body', (req,res)=>{
    console.log("test/body");
    console.log("req.body");
    console.log(req.body);
    console.log("req.params");
    console.log(req.params);
    console.log("req.query");
    console.log(req.query);
    res.json();
});

// app.use("/users", require("../components/users/network"));
app.use("/sales", require("../components/sales/network"));

module.exports = app;