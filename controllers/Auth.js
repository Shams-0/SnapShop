require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const HelperController = require("../utils/helperController");
const User = require("../models/User");
const MailService = require("../services/mail.service");

// Handle Sign up Post Request
exports.postSignUp = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    const hash = HelperController.HashPassword(password)
    password = hash;
    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
  }
}

// Handle Login Post Request
exports.postLogin = async (req, res, next) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = HelperController.comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userFT = { id: user.id, email: user.email, }
    const token = jwt.sign(userFT, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
    res.json({ user: { id: user.id, name: user.name, email: user.email, token } });

  } catch (e) {
    console.log(e);
  }
}

// Handle ForgetPassword Post Request
exports.postForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    const token = jwt.sign({ id: user.id, }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
    const emailService = new MailService();
    await emailService.sendForgetPasswordEmail(user, token);
    user.token = token;
    await user.save();
    res.status(200).json({ message: "Token successfuly send to your E-mail address." });
  } catch (e) {
    console.log(e);
  }
}

// Handle ResetPassword Post Request
exports.postResetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "The passwords entered do not match. Please try again." });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ error: "Unauthorized access: Invalid Token." });
    });
    const decodedToken = jwt.decode(token);

    const user = await User.findById(decodedToken.id);
    const tokenMatched = token === user.token;
    if (!tokenMatched) return res.status(401).json({ error: "Unauthorized access: Token not found." });

    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) return res.status(401).json({ error: "New password cannot be the same as your old password." });

    const hashed = HelperController.HashPassword(password);
    user.password = hashed;
    user.token = null;
    await user.save();
    res.status(200).json({ message: "Your password has been reset successfully." });

  } catch (error) {
    console.log(error);
  }
}