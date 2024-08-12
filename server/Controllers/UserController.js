import expressAsyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN USER

// UserController.js

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// UPDATE USER PROFILE

const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;

  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists update user data
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updatedUser = await user.save();
      //  if user updated send user data
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        isAdmin: user.isAdmin,
        image: updatedUser.image,
        token: generateToken(updatedUser._id),
      });
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE USER PROFILE

const deleteUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists delete user
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can not delete admin");
      } else {
        await user.deleteOne();
        res.json({ message: "User deleted" });
      }
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// CHANGE USER PASSWORD
const changeUserPassword = expressAsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    // if old password exists, compare and update
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      // hash new password
      const salt = await bcrypt.genSalt(10); // Corrected this line
      const hashPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashPassword;
      await user.save();
      res.json({ message: "Password changed successfully" });
    } else {
      throw new Error("Invalid old password");
    }
  } catch (e) {
    res.status(400).json({ message: e.message }); // Corrected this line
  }
});

// GET ALL LIKED MOVIES AND FAVOURITES

const getLikedMovies = expressAsyncHandler(async (req, res) => {
  try {
    // find user in database
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exists send liked movies
    if (user) {
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADD MOVIE TO LIKED MOVIES

const addLikedMovie = expressAsyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find user in database
    const user = await User.findById(req.user._id);
    // if user exists add liked movie
    if (user) {
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ALL LIKED MOVIES

const deleteLikedMovies = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "Your Favourite movies deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//********ADMIN CONTROLLERS****************

const getUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cannot Delete Admin");
      }
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovies,
  getUsers,
  deleteUser,
};
