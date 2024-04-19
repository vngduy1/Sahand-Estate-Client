import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

const testUser = (req, res) => {
  res.json({
    message: "hello",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));

  try {
    await User.findByIdAndDelete(req.params.id);

    res.clearCookie("access_token");

    res.status(200).json("User has been deleted!");
  } catch (error) {
    console.log("deleteUser", error);
    next(error);
  }
};

const getUserListing = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only view your own listing!"));

  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      console.log("getUserListing", error);
      next(error);
    }
  }
};

export { testUser, updateUser, deleteUser, getUserListing };
