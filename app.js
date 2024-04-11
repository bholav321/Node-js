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
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

import cors from 'cors'
const app = express();
app.use(cors());

const filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(filename)

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
 
app.listen(3000,()=>{
    console.log("server started...")
})