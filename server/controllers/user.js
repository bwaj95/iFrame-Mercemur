import argon2 from "argon2";
import jwt from "jsonwebtoken";
import FrameData from "../models/frameData.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password } = req.body;

    if (!isValidEmail(email)) throw new Error("Invalid Email.");
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User exists. Please login.");

    const hashedPassword = await argon2.hash(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const { password: _password, ...others } = user._doc;

    res.status(200).json({ user: others, token });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) throw new Error("Invalid Email.");
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid User. Please register.");

    if (!(await argon2.verify(user.password, password)))
      throw new Error("Invalid credentials");

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const { password: _password, ...others } = user._doc;

    res.status(200).json({ user: others, token });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const history = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    let frameIds = user.frameIds;

    const urlList = [];

    for (let i = 0; i < frameIds.length; i++) {
      if (!mongoose.Types.ObjectId.isValid(frameIds[i])) {
        urlList.push("Not a valid ID.");
      } else {
        const frame = await FrameData.findOne({ _id: frameIds[i] });
        console.log(frame.url.toString());
        urlList.push(frame.url.toString());
      }
    }

    console.log("urlList:", urlList);
    res.status(200).json({ urlList });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailRegex.test(email) ? true : false;
};
