const accountSid = 'ACbc961f6d80ec2824aaa1c9b91d14bd8b'; // Your Account SID from www.twilio.com/console
const authToken = '7c08bc703ab7724f6e7b338b92681013';   // Your Auth Token from www.twilio.com/console

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
