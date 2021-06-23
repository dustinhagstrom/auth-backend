const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");

function checkIsEmailFunc(req, res, next) {
  const { errorObj } = res.locals;

  //check to see if valid email
  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }
  next();
}

function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  const userInputObj = req.body;
  for (inputField in userInputObj) {
    if (inputField === "lastName" || inputField === "firstName") {
      if (!checkIsAlpha(userInputObj[inputField])) {
        errorObj[
          `${inputField}`
        ] = `${inputField} can only have letter characters.`;
      }
    }
  }
  next();
}

function checkIsAlphanumericFunc(req, res, next) {
  const { errorObj } = res.locals;
  if (!checkIsAlphanumeric(req.body.username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  }
  next();
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
};
