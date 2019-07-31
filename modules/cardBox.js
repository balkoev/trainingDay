const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});


const cardBoxSchema = new mongoose.Schema(
  {
   title: String,           // название колоды
   position: String         // для какой должности
  }
);
const CardBox = mongoose.model('cardboxes', cardBoxSchema);
module.exports = CardBox;
