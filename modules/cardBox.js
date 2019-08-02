const mongoose = require("mongoose");
const { mongoConnect } = require('../app');

mongoConnect;

const cardBoxSchema = new mongoose.Schema(
  {
   title: String,           // название колоды
   position: String         // для какой должности
  }
);
const CardBox = mongoose.model('cardboxes', cardBoxSchema);
module.exports = CardBox;
