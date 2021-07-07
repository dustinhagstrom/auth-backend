const express = require("express");
const router = express.Router(); //bring in express and router

const { signup, login } = require("./controller/userController"); //bring in signup/login
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc"); //bring in our func

const checkIsUndefined = require("./helpers/checkIsUndefined"); //bring in our func

const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc"); //bring in our func

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware"); //destructure middleware funcs
//route a signup post req and run through all middleware and then through signup
router.post(
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);
//route a login post req and run through all middleware and then through login
router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

module.exports = router; //export our router
