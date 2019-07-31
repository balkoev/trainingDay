const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});


const userSchema = new mongoose.Schema(
  {
    telephone: String,   // Номер телефона
    name: String,       // ФИО
    position: String    // должность
  }
);
const User = mongoose.model('users', userSchema);
module.exports = User;
