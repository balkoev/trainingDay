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
    let user = new User({telephone: "+79037573055", name:"Nikita Kalinnikov", position: "WEB DEVELOPER"})
    let cardBox = new CardBox({title:"express", position: "WEB DEVELOPER"})
    let card = new Card({title:"Template", content:"Template is a funtion", cardBox: cardBox.title})
    let quastionBox = new QuastionBox({title:"express", position:"WEB DEVELOPER"})
    let quastion = new Quastion({title:"What is Template?", answer: ["Template is a funtion"], wrongAnswer: ["Template is not a function"], card: card.title, quastionBox: quastionBox.title})
    await user.save()
    await cardBox.save()
    await card.save()
    await quastion.save()
    await quastionBox.save()
    let users = await User.find()
    console.log(users)
}
fill()

