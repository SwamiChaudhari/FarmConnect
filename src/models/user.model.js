import mongoose, { Schema } from "mongoose"; //importing mongoose and schema from mongoose
import jwt from "jsonwebtoken"; // for generating jwt token for user authentication and authorization
import bcrypt from "bcryptjs"; // for hashing the password

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url for the avatar
      default:
        "https://res.cloudinary.com/dxv8p5zck/image/upload/v1610903506/avatars/avatar1.png",
      required: true,
    },

    coverImage: {
      type: String, //cloudinary url for the cover image
      default:
        "https://res.cloudinary.com/dxv8p5zck/image/upload/v1610903506/avatars/avatar1.png",
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId, // video id
        ref: "Video", // video model
      },
    ],

    password: {
      type: String,
      required: true[(6, "Password must be at least 6 characters")],
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt fields are automatically added to the schema
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hashsync(this.password, 8);
  next();
}); // hashing the password before saving the user to the database

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // compare the password with the hashed password
}; // if the password is correct return true else false

userSchema.methods.generateaccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    }
  );
};

export const User = mongoose.model("User", userSchema);
