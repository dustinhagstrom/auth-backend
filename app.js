const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const userRouter = require("./routes/user/userRouter");
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
const errorController = require("./routes/utils/errorController");
const twilioRouter = require("./routes/twilio/twilioRouter");
const app = express();

const APIKeyRouter = require("./routes/utils/APIKeyRouter");

app.use(cors());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
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

app.use("/api", limiter);

app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRouter);
app.use("/api/appid", APIKeyRouter);
app.use("/api/send-sms", twilioRouter);

//if none of the urls match then following function is called. otherwise if error then it goes to errorController func
app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});

app.use(errorController);
module.exports = app;
