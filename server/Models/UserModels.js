import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your Full Name"],
    },

    email: {
      type: String,
      required: [true, "Please enter your Email"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please Enter A Strong Password"],
      minlength: [8, "Password must be atleast 8 Characters Long"],
    },

    image: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
