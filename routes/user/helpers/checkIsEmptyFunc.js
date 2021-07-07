const { checkIsEmpty } = require("../../utils/authMethods"); //bring in check is empty from authmethods

function checkIsEmptyFunc(req, res, next) {
  //make our own checkemptyfunc
  const { errorObj } = res.locals; //destructure res.locals errorobj
  //cannot use array.prototype.forEach() b/c not array. it is object
  //check to see if any user input field is empty
  let userObj = req.body; //assing req.body to userobj
  for (let field in userObj) {
    //loop through user obj
    if (checkIsEmpty(userObj[field])) {
      //if a field is empty then add field error message to error obj
      errorObj[field] = `${field} cannot be empty.`;
    }
  }

  if (Object.keys(errorObj).length > 0) {
    //if the array of keys.length<0 then give the errorobj otherwise next func
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next();
  }
}

module.exports = checkIsEmptyFunc; //export checkisemptyfunc
