const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator"); //destructures from validator module

const checkIsEmpty = (target) => (isEmpty(target) ? true : false); //make check is empty ternary

const checkIsStrongPassword = (
  password //strong password check
) => (isStrongPassword(password) ? true : false); //ternary for readability
//and following are also checks. they are written like this in case we need to swap validator for something else in future
const checkIsEmail = (email) => (isEmail(email) ? true : false);

const checkIsAlpha = (name) => (isAlpha(name) ? true : false);

const checkIsAlphanumeric = (name) => (isAlphanumeric(name) ? true : false);

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
}; //export our funcs
