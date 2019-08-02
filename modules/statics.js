const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});


const statSchema = new mongoose.Schema(
  {
   user: String,         // сам вопрос
   qb: String,      // правильный ответ или ответы(по это массив)
   counter: Number,    // id картоочки по которой вопрос
  }
);
const Stat = mongoose.model('stats', statSchema);

module.exports = Stat;
