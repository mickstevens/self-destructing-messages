// index.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));

// app goes here

function tryDelete(messageSid) {
  client.messages(messageSid).get()
    .then((message) => {
      if (message.status === "received") {
        client.messages(messageSid).delete()
          .then(() => console.log("Message deleted"))
          .catch((err) => console.error(err));
      } else {
        setTimeout(() => tryDelete(messageSid), 1000);
      }
    })
    .catch((err) => console.error(err));
}
 
app.post('/messages', (request, response) => {
  console.log(request.body.Body);
//  client.messages(request.body.MessageSid).post({ body: '' })
//    .then((message) => response.send('<Response/>'))
//    .catch((err) => {
//      console.error(err);
      response.send('<Response/>')
      tryDelete(request.body.MessageSid);
    });
// });

app.listen(3000, () => {
  console.log('Your application has started on http://localhost:3000')
});
