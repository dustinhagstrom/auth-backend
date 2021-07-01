const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleware");

router.post("/", jwtMiddleware, function (req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: req.body.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.MY_PHONE_NUMBER,
    })
    .then((message) => {
      res.json({
        message: "success",
        payload: message.body,
      });
    }) //catch block was not in api docs. it is assumed that we know that we need a catch block. errors go to errorController and we can use the error obj received to build a function to display what info we want to display.
    .catch((error) => {
      res.json({
        message: error.message,
        error: error,
      });
    });
});

module.exports = router;
