const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const userModel = mongoose.model("user", userSchema);
const admSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const admModel = mongoose.model("Admin", admSchema);
module.exports = { userModel, admModel };