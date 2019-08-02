const mongoose = require("mongoose");
const { mongoConnect } = require('../app');

mongoConnect;

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    title: String,             // название карточки
    content: String,           // контент внутри карточки
    cardBox: String,        // id к какой колоде карточка привязана
  }
);
const Card = mongoose.model('cards', cardSchema);
module.exports = Card;
