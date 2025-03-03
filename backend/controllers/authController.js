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

exports.login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
    
        let user = await User.findOne({ email });
        if (!user) return next(errorHandler(400,"Invalid Credentials"));
    
        const validPassword = await bcrypt.compare(
            password,
            user.password
          );
          if (!validPassword) {
            return next(errorHandler(400,"Invalid Credentials"));
          }
          
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

          const{ password: pass , ...restInfo} = user._doc;

          res.cookie("access_token", token,{httpOnly: true}).status(201).json(restInfo);
      } catch (err) {
        next(err);
      }
};

