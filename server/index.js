import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/users.js";
import iframesRoute from "./routes/iframes.js";

const app = express();

dotenv.config();
const CONNECTION_STRING = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connection Success."))
  .catch((error) => console.log(error));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoute);
app.use("/iframes", iframesRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
