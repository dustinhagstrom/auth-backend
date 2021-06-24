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
function dispatchErrorProduction(error, req, res) {}

function handleMongoDBDuplicate(err) {
  // we have to parse some data here.
  return new ErrorMessageHandlerClass(err, 400);
}

module.exports = (err, req, res, next) => {
  console.log("2");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("3");
  console.log(err);

  let error = { ...err };
  console.log("4");
  console.log(error);

  error.message = err.message;
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
