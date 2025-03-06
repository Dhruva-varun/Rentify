const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
    },
    profile_pic:{
      type:String,
      default:"https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
