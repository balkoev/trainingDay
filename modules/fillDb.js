const mongoose = require("mongoose");
const User = require("./users");
const CardBox = require("./cardBox");
const Card = require("./cards");
const Quastion = require("./quastions");
const QuastionBox = require("./quastionBox")


mongoose.connect('mongodb://localhost:27017/supersprint', {
  useNewUrlParser: true
});

 async function  fill() {
    let user = new User({telephone: "89037573055", name:"Nikita Kalinnikov", position: "WEB DEVELOPER"})
    let cardBox = new CardBox({title:"express", position: "WEB DEVELOPER"})
    let card = new Card({title:"Template", content:"Template is a funtion", cardBox: cardBox.id})
    let quastionBox = new QuastionBox({title:"express"})
    let quastion = new Quastion({title:"What is Template?", answer: ["Template is a funtion"], wrongAnswer: ["Template is not a function"], card: card.id, quastionBox: quastionBox.id})
    await user.save()
    await cardBox.save()
    await card.save()
    await quastion.save()
    await quastionBox.save()
}
// fill();
