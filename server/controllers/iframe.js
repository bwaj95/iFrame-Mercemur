import FrameData from "../models/frameData.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const createFrame = async (req, res) => {
  try {
    const { url } = req.body;
    const userId = req.userId;

    if (!isValidURL(url)) throw new Error("Invalid URL.");

    //const domain = url.split("/")[2];

    let urlObject = new URL(url);
    const origin = urlObject.origin;
    const host = urlObject.host;

    const frame = new FrameData({
      url,
      origin,
      host,
      userId,
    });
    await frame.save();

    const user = await User.findOne({ _id: userId });
    await user.updateOne({ $push: { frameIds: frame._id } });

    res.status(200).json({ url: frame.url });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const getFrameById = async (req, res) => {
  //const {id: _id} = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      res.status(404).json("Invalid URL.");

    const frame = await FrameData.findOne({ _id: req.params.id });

    if (!frame) throw new Error("No iframes with that ID.");

    res.status(200).json({ url: frame.url });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const isValidURL = (url) => {
  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gim;
  return urlRegex.test(url) ? true : false;
};
