const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");

exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(errorHandler(400,"user already exists"));

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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        let user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid Credentials");
    
        const validPassword = await bcrypt.compare(
            password,
            user.password
          );
          if (!validPassword) {
            return res.send({
              success: false,
              message: "Invalid password",
            });
          }
          
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          res.status(201).json({
            token,
            message: "User login successful"
          });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "User login failed" });
      }
};

