function checkIsUndefined(req, res, next) {
  //check for undefined fields
  if (Object.keys(req.body).length === 0) {
    //if the array of key from req.body length is 0 then send a message that user needs to fill out the form
    res.status(500).json({ message: "Please fill out the form" });
  }
  let errorObj = {}; //declare an empty errorobj
  res.locals.errorObj = errorObj; //set the local obj to have empty error obj we just declared
  next(); //next func
}

module.exports = checkIsUndefined; //export checkisundefined
