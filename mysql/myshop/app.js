import bodyParser from "body-parser";
import express from "express";
import AdminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import categouryRouter from "./routes/category.route.js"
import productRounter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"
import path from "path";
import orderRouter from "./routes/Order.route.js"
import deliveryRouter from "./routes/delivery.route.js"
import deliveryBoyRouter from "./routes/deliveryBoy.route.js"
import { fileURLToPath } from "url";
// import {fileulrtopath} from "url"
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",AdminRouter);
app.use("/user",userRouter);
app.use("/category",categouryRouter)
app.use("/product",productRounter)
app.use("/cart",cartRouter);
app.use("/order",orderRouter)
app.use("/delivery",deliveryRouter)
app.use("/deliveryBoy",deliveryBoyRouter)

app.listen(3008,()=>{
    console.log("server started...");
});

