const bcrypt = require("bcryptjs"); // bring in bcryptjs and jsonwebtoken
const jwt = require("jsonwebtoken");

const User = require("../model/User"); //bring in user model

async function signup(req, res, next) {
  //signup function
  const { username, email, password, firstName, lastName } = req.body; // deconstruct req obj

  const { errorObj } = res.locals; //deconstruct errorobj from res.locals obj

  if (Object.keys(errorObj).length > 0) {
    //if the length of the array of obj keys exists then we have some errors so give the errorobj
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12); //use bcrypt to generate a salt of 12 chars
    let hashedPassword = await bcrypt.hash(password, salt); //then use bcrypt to hash the user's password + salt.

    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    }); // new User declared using User schema. the inputs from user are used and the password is set to the big hashed password

    let savedUser = await createdUser.save(); //the new user is saved to database
    res.json({ message: "success - user created" });
  } catch (e) {
    //catch the errors and use next to send to error controller.
    console.log("1");
    next(e);

    // res.status(500).json({ message: "Error", error: e });
  }
}

async function login(req, res) {
  //login func
  const { errorObj } = res.locals; //same destructure as above
  const { email, password } = req.body; //same destructure as above
  if (Object.keys(errorObj).length > 0) {
    //same error obj thing
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    let foundUser = await User.findOne({ email: email }); //match the input email to a user in the database.

    if (!foundUser) {
      //if no match then send 400 status with a message
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password.",
      });
    } else {
      //otherwise we have a match ==> we use bcrypt to compare the password in the database to the one supplied by user
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        //if doesn't match the send 400 status with a message
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password.",
        });
      } else {
        //otherwise use jwt to make a web token with the email of the user from database and the jwt key info stored within token. assign a length of time before token expires
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );

        res.json({ message: "success", payload: jwtToken }); //give the token
      }
    }
  } catch (e) {
    //catch all errors and send to error controller
    console.log(e);
    console.log(e.message);
    next(e);
  }
}

module.exports = { signup, login }; //export signup and login.
