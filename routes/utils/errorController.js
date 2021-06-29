const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

function dispatchErrorDevelopment(error, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
  }
}
function dispatchErrorProduction(error, req, res) {
  if (req.originalUrl.startsWith("/api")) {
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack,
      });
    }
    // ^^^ this is to show an operational error
    // below is to show user this error message. we don't want to show the user what the error details are.
    return res.status(error.statusCode).json({
      status: "Error",
      message:
        "Something went wrong. Please contact support 123-999-8888 or email us at xxx@gmail.com",
    });
  }
}

function handleMongoDBDuplicate(err) {
  // SOLUTION 1 - GO TO err.keyValue in err obj.
  console.log("111");
  //   console.log(err.keyValue);
  let errorMessageDuplicateKey = Object.keys(err.keyValue)[0];
  //^^^^this is the key to an object with a length of only 1.
  let errorMessageDuplicateValue = Object.values(err.keyValue)[0];
  let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken please choose another one.`;
  return new ErrorMessageHandlerClass(message, 400);

  //SOLUTION 2 - use REGEX on err.message
  // message: 'E11000 duplicate key error collection: auth-backend.users index: username_1 dup key: { username: "sjf" }'
  //get to the brackets -> username: "sjf"
  //remove the quotes -> username: sjf
  //remove colon -> username sjf
  //put into array -> [username, sjf]
  //   let errorMessage = err.message;

  //   let findOpeningBracket = errorMessage.match(/{/).index;
  //   let findClosingBracket = errorMessage.match(/}/).index;

  //   console.log(findOpeningBracket);
  //   console.log(findClosingBracket);

  //   let foundDuplicateValueString = errorMessage.slice(
  //     findOpeningBracket + 1,
  //     findClosingBracket
  //   );

  //   console.log(foundDuplicateValueString);

  //   let newErrorString = foundDuplicateValueString.replace(/:|\"/g, ""); //find the colon or quote, globally and replace with empty space
  //   let trimmedNewErrorString = newErrorString.trim();
  //   //trim() method removes whitespace from either end of a string. whitespace was on either side because it was in obj notation.
  //   console.log(trimmedNewErrorString);

  //   let errorStringArray = trimmedNewErrorString.split(" ");
  //   //this puts the two words into an array
  //   let message = `${errorStringArray[0]} - ${errorStringArray[1]} is taken please choose another one.`;

  //   return new ErrorMessageHandlerClass(message, 400);
}

module.exports = (err, req, res, next) => {
  console.log("2");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("3");
  console.log(err);
  console.log("9");
  console.log({ ...err });

  let error = { ...err };
  console.log("4");
  console.log(error);

  error.message = err.message; //the message has to manually be extracted from err obj and applied to error obj b/c spread operator doesn't transfer the message
  console.log("5");
  console.log(error.message);
  console.log("6");
  console.log(error);

  if (error.code === 11000 || error.code === 11001) {
    error = handleMongoDBDuplicate(error);
    //these error.codes are from mongodb or mongoose.
  }

  console.log("7");
  console.log(error);
  if (process.env.NODE_ENV === "development") {
    dispatchErrorDevelopment(error, req, res);
  } else {
    dispatchErrorProduction(error, req, res);
  }
};
