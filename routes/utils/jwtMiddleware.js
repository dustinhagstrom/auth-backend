const jwt = require("jsonwebtoken"); //bring in jsonwebtoken

//using headers and under authorization using bearer token.
async function checkJwtToken(req, res, next) {
  try {
    console.log(req.headers);

    //look more into req.headers
    if (req.headers && req.headers.authorization) {
      //if there are headers and there is an authorization header then
      let jwtToken = req.headers.authorization.slice(7); //this cuts out 'Bearer '
      console.log(jwtToken); //this is just the token w/out string 'Bearer '
      let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY); //decode the token

      console.log(decodedJwt);
      res.locals.decodedJwt = decodedJwt; //this will help us tie friends to a specific user.
      next(); //perform next func
    } else {
      //if we don't have headers and authorization header then throw error and message
      throw { message: "You don't have permission! ", statusCode: 500 };
    }
  } catch (e) {
    next(e); //catch error and perform next error func
  }
}

module.exports = checkJwtToken; //export the check
