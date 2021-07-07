const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods"); //bring in checks --> these are all middleware

function checkIsEmailFunc(req, res, next) {
  //make check email func
  const { errorObj } = res.locals; //destructure res.locals errorobj

  //check to see if valid email
  if (!checkIsEmail(req.body.email)) {
    //if not valid then set wrong email format in error obj
    errorObj.wrongEmailFormat = "Must be in email format!";
  }
  next(); //go to next func
}

function checkIsAlphaFunc(req, res, next) {
  //check alpha func
  const { errorObj } = res.locals; //destructure res.locals errorobj
  const userInputObj = req.body; //assign req obj to userinputobj
  for (inputField in userInputObj) {
    //loop through userinputobj
    if (inputField === "lastName" || inputField === "firstName") {
      //if key equals lastname or firstname then if the value fails the alpha check, assign more data to errorobj
      if (!checkIsAlpha(userInputObj[inputField])) {
        errorObj[
          `${inputField}`
        ] = `${inputField} can only have letter characters.`;
      }
    }
  }
  next(); //next func
}

function checkIsAlphanumericFunc(req, res, next) {
  //check if alphanumeric
  const { errorObj } = res.locals; //destructure res.locals errorobj
  if (!checkIsAlphanumeric(req.body.username)) {
    //if username not alphanumeric then attach more to errorobj
    errorObj.usernameError = "username can only have characters and numbers";
  }
  next(); //next func
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
}; //export middleware
