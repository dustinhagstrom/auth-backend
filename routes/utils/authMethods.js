const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator"); //isEmpty from validator module

const checkIsEmpty = (target) => (isEmpty(target) ? true : false);

const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false; //ternary for readability

const checkIsEmail = (email) => (isEmail(email) ? true : false);

const checkIsAlpha = (name) => (isAlpha(name) ? true : false);

const checkIsAlphanumeric = (name) => (isAlphanumeric(name) ? true : false);

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};
