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
const gameSchema = new mongoose.Schema({
  name: String,
  date:Date,
  details: String,
  tags: [String],
  images: [String], // Store Cloudinary URLs
  minSpecs: String,
  recSpecs: String,
  purchaseLinks: [String],
  price: String,
});

const Game = mongoose.model("Game", gameSchema);
module.exports = { userModel, admModel, Game};
