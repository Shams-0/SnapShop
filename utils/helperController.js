require("dotenv").config();
const bcrypt = require("bcryptjs");


class HelperController {
  // hash password
  HashPassword = (password) => {
    //   generate salt for password
    const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  // compare passwords
  comparePassword = (password, user_password) => {
    // Check if user password is correct
    const isCorrect = bcrypt.compareSync(password, user_password);
    return isCorrect;
  };
}

module.exports = new HelperController();