const { checkIsStrongPassword } = require("../../utils/authMethods");

function checkIsStrongPasswordFunc(req, res, next) {
  const { errorObj } = res.locals;
  // if (!checkIsStrongPassword(req.body.password)) {
  //   errorObj.weakPassword =
  //     "Your password must contain at least 1 lowercase letter, 1 uppercase letter, 1 special character, 1 number, and a minimum length of 8 characters.";
  // }
  next();
}

module.exports = checkIsStrongPasswordFunc;
