class ErrorMessageHandlerClass extends Error {
  //extends ... an obj in this case an error obj. this Error obj is built in to node
  constructor(message, statusCode) {
    //constructor with passed in args from errorcontroller
    super(message, statusCode); //must have super

    this.statusCode = statusCode; //assigns this obj with values of status code and status of fail if it starts with a 4 or error otherwise.
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; //assigns error to 'operational' vice programmer error
  }
}

module.exports = ErrorMessageHandlerClass; //export class
