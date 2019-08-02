const mongoose = require("mongoose");
const { mongoConnect } = require('../app');

mongoConnect;

const userSchema = new mongoose.Schema(
  {
    telephone: String,   // Номер телефона
    name: String,       // ФИО
    position: String    // должность
  }
);
const User = mongoose.model('users', userSchema);
module.exports = User;
