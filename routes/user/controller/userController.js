const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

async function signup(req, res, next) {
  const { username, email, password, firstName, lastName } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save();
    res.json({ message: "success - user created" });
  } catch (e) {
    console.log("1");
    next(e);

    // res.status(500).json({ message: "Error", error: e });
  }
}

async function login(req, res) {
  let errorObj = {};
  const { email, password } = req.body;
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password.",
      });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password.",
        });
      } else {
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );

        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup, login };
