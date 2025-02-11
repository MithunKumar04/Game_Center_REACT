const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const {
  userModel,
  ResModel,
  itemModel,
  cartModel,
  orderModel,
} = require("./models/item.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const url = process.env.MONGO_URL;
mongoose.connect(url);
