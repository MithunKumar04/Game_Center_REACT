const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const {
  userModel,
  admModel,
} = require("./models/game.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const url = process.env.MONGO_URL;
mongoose.connect(url);

app.post("/registeradmin", (req, res) => {
  const { name, email, password } = req.body;
  admModel.findOne({ email: email }).then((user) => {
    if (user) res.json("User Aleady Exist");
    else {
      ResModel.create(req.body)
        .then((items) => res.json(items))
        .catch((error) => res.json(error));
    }
  });
});
app.post("/loginadmin", (req, res) => {
  const { email, password } = req.body;
  admModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) res.json(user);
      else res.json("Incorrect password");
    } else {
      res.json("User doesnot exist");
    }
  });
});

app.post("/", (req, res) => {
  const { name, email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) res.json("User Aleady Exist");
    else {
      userModel
        .create(req.body)
        .then((items) => res.json(items))
        .catch((error) => res.json(error));
    }
  });
});
app.post("/loginuser", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) res.json(user);
      else res.json("Incorrect password");
    } else {
      res.json("User doesnot exist");
    }
  });
});


app.listen(process.env.PORT || 3000, () => {
  console.log("app is running");
});