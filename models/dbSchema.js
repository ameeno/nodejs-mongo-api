const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
