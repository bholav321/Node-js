import express from 'express';
import bodyParser from 'body-parser';
import categoryRouter from './route/category.route.js'
import userRouter from './route/user.route.js'
import adminRouter from './route/admin.route.js'
import cartRouter from './route/cartItem.route.js'
import productRouter from './route/product.route.js'
import orderRouter from './route/order.route.js'
import deliveryBoyRouter from './route/deliveryBoy.route.js'
import deliveryDataRouter from './route/deliveryData.route.js'
import wishlistRouter from './route/wishlist.route.js'
import reviewRouter from './route/review.route.js'
import paymentRouter from './route/payment.route.js'
import ContactRouter from './route/contactus.route.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import { Order } from './model/order.model.js';
import { API } from './config/config.js';
import otpRouter from './route/otpSender.route.js'
import dotenv from "dotenv";
dotenv.config();

// import { config } from 'dotenv';
import Razorpay from "razorpay";

// config({ path: "./config/config.env" });
export const instance = new Razorpay({
    key_id: API.RAZORPAY_API_KEY,
    key_secret: API.RAZORPAY_APT_SECRET,
  });
  

import cors from 'cors'
const app = express();
app.use(cors());


const filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(filename)

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/category",categoryRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);
app.use("/cart",cartRouter);
app.use("/deliveryBoy",deliveryBoyRouter);
app.use("/deliverydata",deliveryDataRouter);
app.use("/wishlist",wishlistRouter)
app.use("/review",reviewRouter)
app.use("/payment", paymentRouter)
app.use("/contact",ContactRouter)
app.use("/otp", otpRouter);

app.listen(3000,()=>{
    console.log("server started...")
})