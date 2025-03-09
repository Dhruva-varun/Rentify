const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { errorHandler } = require("../utils/error");

exports.updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'Not Authenticated !'));
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
              profile_pic: req.body.photo,
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
