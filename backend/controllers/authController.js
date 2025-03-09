const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");

exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(errorHandler(400,"User Already Exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json( "User registered successfully" );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) return next(errorHandler(400, "Invalid Credentials"));

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return next(errorHandler(400, "Invalid Credentials"));

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...restInfo } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(201).json(restInfo);
  } catch (err) {
      next(err);
  }
};

exports.google = async (req, res, next) => {
  try {
      const { email } = req.body;
      let user = await User.findOne({ email });

      if (user) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          const { password: pass, ...restInfo } = user._doc;
          res.cookie("access_token", token, { httpOnly: true }).status(201).json(restInfo);
      } else {
          const generatePassword = Math.random().toString(36).slice(-8);
          const hashedPassword = bcrypt.hashSync(generatePassword, 10);

          const newUser = new User({
              userName: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
              email: req.body.email,
              password: hashedPassword,
              profile_pic: req.body.photo,
          });

          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password: pass, ...restInfo } = newUser._doc;
          res.cookie('access_token', token, { httpOnly: true }).status(200).json(restInfo);
      }
  } catch (err) {
      next(err);
  }
};