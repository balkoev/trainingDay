const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    title: String,             // название карточки
    content: String,           // контент внутри карточки
    cardBox: ObjectId,        // id к какой колоде карточка привязана
  }
);
const Card = mongoose.model('cards', cardSchema);
module.exports = Card;
