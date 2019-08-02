const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});


const quastionBoxSchema = new mongoose.Schema(
  {
   title: String,
   position:String           // название  теста
  }
);
const QuastionBox = mongoose.model('quastionBoxes', quastionBoxSchema);
module.exports = QuastionBox;
