const express = require("express");
const router = express.Router();
const DBEntry = require("../models/dbSchema");
const json2html = require("node-json2html");

let template = { "<>": "div", html: "${_id} ${userDate}" };

// Getting all
router.get("/", async (req, res) => {
  try {
    const dbEntries = await DBEntry.find();
    // res.json(dbEntries);
    let html = json2html.transform(dbEntries, template);
    res.status(200).send(html);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  const dbentry = new DBEntry();
  try {
    const newTimeStamp = await dbentry.save();
    res.status(201).json(newTimeStamp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
