require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_SMS_TOKEN;   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);


async function SmsSender(smsCode, mobile) {
  try {
  
  let sms = await client.messages.create({
    body: smsCode,
    to: mobile,  // Text this number
    from: '+12055516236' // From a valid Twilio number
  })
} catch (e) {console.log(e)}
  console.log(message.sid)

}

// SmsSender(4444, '+79853445515')

module.exports = SmsSender;
