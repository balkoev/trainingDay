const mongoose = require("mongoose");
const { mongoConnect } = require('../app');

mongoConnect;

const { ObjectId } = mongoose.Schema.Types;

const quastionSchema = new mongoose.Schema(
  {
   title: String,         // сам вопрос
   answer: [String],      // правильный ответ или ответы(по это массив)
   card: String,
   quastionBox: String       // id картоочки по которой вопрос
  }
);
const Quastion = mongoose.model('quastions', quastionSchema);

module.exports = Quastion;
