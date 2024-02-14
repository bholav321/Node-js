import PromptSync from "prompt-sync";
import Order from "../module/Order.module.js";
import CartItem from "../module/cartItem.module.js";
import OrderItem from "../module/orderItem.module.js";
import Cart from "../module/cart.module.js";
let prompt = PromptSync();

export const  orderPlaced =async (req,res,next)=>{
    let delevered = req.body.delevered;
    let contact = req.body.contact;
    let status = req.body.status;
    let userId  = req.body.userId;
    let date = new Date();
    console.log(date);
    let currentDate = date.toString().split("GM");
    console.log(currentDate)
    let cartResult = await Cart.cartId(userId);
    let cartId = cartResult[0].id;
    let result  = await  CartItem.totalPrice(cartId);
    await CartItem.deleteItems(cartId);
    // console.log(result)
    // console.log(result.length)
    for(let i=0; i<result.length; i++){
        let order = new Order(null,currentDate[0],result[i].Total,delevered,contact,userId,status);
        await order.orderPlaced();
        let orderId =  await order.getOrderId(currentDate[0]);
        let orderid = orderId[i].orderid;
        let quantity = result[i].quantity;
        let productId = result[i].id;
        let orderitem = new OrderItem(null,quantity,userId,productId,orderid)
        await orderitem.setOrderItem();
    }
    console.log("order placed successfully..")
    res.status(200).json({message:"Order placed"})
}

export const orderDetails = (req,res,next)=>{
        Order.orderDetails().then(result=>{
            res.status(200).json({message:"Order details",orders:result})
        }).catch(err=>{
            console.log(err);
            res.status(401).json({message:"Internal server Error"})
        });
}