const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const simpleApi = require("./routes/simpleApp");


const port = process.env.PORT || 8080;
app.use(express.json());

app.use("/app", simpleApi);

app.listen(port, function () {
  console.log(`Example app listening on ${port}!`)
})
