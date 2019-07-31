const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});

const { ObjectId } = mongoose.Schema.Types;

const quastionSchema = new mongoose.Schema(
  {
   title: String,         // сам вопрос
   answer: [String],      // правильный ответ или ответы(по это массив)
   wrongAnswer: [String], // варианты неправильных ответов
   card: ObjectId,        // id картоочки по которой вопрос
  }
);
const Quastion = mongoose.model('quastions', quastionSchema);

module.exports = Quastion;
