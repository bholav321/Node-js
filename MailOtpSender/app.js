import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import otpRouter from "./otpSender.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/otp", otpRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("OTP Server Started.." + port);
});
