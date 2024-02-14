
import express from 'express';
import bodyParser from 'body-parser';
import categoryRouter from './route/category.route.js'
import userRouter from './route/user.route.js'
import adminRouter from './route/admin.route.js'
import cartRouter from './route/cartItem.route.js'
import productRouter from './route/product.route.js'
import orderRouter from './route/order.route.js'
import deliveryBoyRouter from './route/deliveryBoy.route.js'
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/category",categoryRouter)
app.use("/product",productRouter);
app.use("/order",orderRouter)
app.use("/cart",cartRouter)
app.use("/deliveryBoy",deliveryBoyRouter)
app.listen(3000,()=>{
    console.log("server started...")
})