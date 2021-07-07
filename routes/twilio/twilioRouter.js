const express = require("express"); //bring in express, router and the middleware file
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleware");

//post req router. runs req through jwtMiddleware prior to making and sending a message
router.post("/", jwtMiddleware, function (req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID; // this is my twilio id
  const authToken = process.env.TWILIO_AUTH_TOKEN; // this is my twilio token
  const client = require("twilio")(accountSid, authToken); // uses my id and token to make a client for my account

  client.messages
    .create({
      //create a message with message req obj
      body: req.body.message,
      from: process.env.TWILIO_PHONE_NUMBER, //my twilio phone number
      to: `+1${req.body.cell}`, //my actual cell phone number
      // to: process.env.MY_PHONE_NUMBER,
    })
    .then((message) => {
      //take that message and say success and give the actual message sent
      res.json({
        message: "success",
        payload: message.body,
      });
    }) //catch block was not in api docs. it is assumed that we know that we need a catch block. errors go to errorController and we can use the error obj received to build a function to display what info we want to display.
    .catch((error) => {
      //catch all errors and tell us what they are.
      res.json({
        message: error.message,
        error: error,
      });
    });
});

module.exports = router; //export router so other files can reference this one.
