const jwt = require("jsonwebtoken");

//using headers and under authorization using bearer token.
async function checkJwtToken(req, res, next) {
  try {
    console.log(req.headers);

    //look more into req.headers
    if (req.headers && req.headers.authorization) {
      let jwtToken = req.headers.authorization.slice(7); //this cuts out 'Bearer '
      console.log(jwtToken); //this is just bearer the token
      let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY);

      console.log(decodedJwt);
      next();
    } else {
      throw { message: "You don't have permission! ", statusCode: 500 };
    }
  } catch (e) {
    next(e);
  }
}

module.exports = checkJwtToken;
