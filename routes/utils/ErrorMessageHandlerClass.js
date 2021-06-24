class ErrorMessageHandlerClass extends Error {
  //extends ... an obj in this case an error obj. this Error obj is built in to mongoose or mongodb
  constructor(message, statusCode) {
    super(message, statusCode);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = ErrorMessageHandlerClass;
