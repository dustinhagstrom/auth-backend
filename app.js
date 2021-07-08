const express = require("express"); //bring in express, morgan, cors, and express rate limit
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const userRouter = require("./routes/user/userRouter"); //user router path
const friendRouter = require("./routes/friend/friendRouter");
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass"); //ErrorMessageHandlerClass path
const errorController = require("./routes/utils/errorController"); //errorController path
const twilioRouter = require("./routes/twilio/twilioRouter"); //twilioRouter path
const app = express(); //assign express() to app

app.use(cors());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev")); //if we are in development then use morgan
}

//limiter function. can change first num at adjust time and can change value of second key to adjust number of attempts.
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    error:
      "Too many requests from this IP, please try again or contact support",
  },
});

app.use("/api", limiter); //use limiter

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false })); //built in middleware in express that parses urlencoded payloads.
app.use("/api/user", userRouter); // use userRouter
app.use("/api/send-sms", twilioRouter); //use twilioRouter
app.use("/api/friend", friendRouter);

//if none of the urls match then following function is called. otherwise if error then it goes to errorController func
app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});

app.use(errorController); //use error controller
module.exports = app; //export app
