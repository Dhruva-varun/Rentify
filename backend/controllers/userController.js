const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Listing = require("../models/listingModel.js");
const { errorHandler } = require("../utils/error");

exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Not Authenticated !"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profile_pic: req.body.profile_pic,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Not Authenticated !"));
  try {
    await User.findByIdAndDelete(req.params.id);

    res.clearCookie('access_token')
    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};

exports.getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only view your own listings!'));
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (err) {
      next(err);
    }
};
