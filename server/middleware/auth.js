import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("Token missing.");

    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!payload) throw new Error("Auth missing");

    req.userId = payload.id;

    next();
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export default auth;
