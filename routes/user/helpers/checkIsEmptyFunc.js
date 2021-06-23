const { checkIsEmpty } = require("../../utils/authMethods");

function checkIsEmptyFunc(req, res, next) {
  const { errorObj } = res.locals;
  //cannot use array.prototype.forEach() b/c not array. it is object
  //check to see if any user input field is empty
  let userObj = req.body;
  for (let field in userObj) {
    if (checkIsEmpty(userObj[field])) {
      errorObj[field] = `${field} cannot be empty.`;
    }
  }

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next();
  }
}

module.exports = checkIsEmptyFunc;
