const mongoose = require("mongoose");
const { mongoConnect } = require('../app');

mongoConnect;

const quastionBoxSchema = new mongoose.Schema(
  {
   title: String,
   position:String           // название  теста
  }
);
const QuastionBox = mongoose.model('quastionBoxes', quastionBoxSchema);
module.exports = QuastionBox;
