import { raw } from "mysql2";
import Cart from "../model/Cart.model.js";
import { cartItem } from "../model/cartItem.model.js";
import { Order } from "../model/order.model.js";
import { orderItem } from "../model/orderItem.model.js";

export const placedOrder =async (req,res,next)=>{
    let date = new Date();
    let currentDate = date.toString().split("GM")[0];
    // console.log(currentDate)
    let userId = req.body.userId;
    let cartResult= await Cart.findOne({where:{userId:userId}});
    let cartId = cartResult.dataValues.id;
    let cartItemResult = await cartItem.findAll({where:{cartId:cartId},raw:true});
    await cartItem.destroy({where:{cartId:cartId}});
    let orderItemRes;
    for(let i=0; i<cartItemResult.length; i++){
         let productId = cartItemResult[i].productId;
         let quantity = cartItemResult[i].Quantity;
       await  Order.create({
            OrderDate:currentDate,
            Address:req.body.Address,
            status:req.body.status,
            UserContact:req.body.contact,
            userId:req.body.userId
        });
        let orderId = await Order.findAll({where:{OrderDate:currentDate},raw:true})
        // console.log(orderId)
        orderId = orderId[i].id;
        console.log("orderid :"+orderId);
        orderItemRes =   await orderItem.create({
            productId:productId,    
            Quantity:quantity,  
            orderId:orderId
        })
    }   
    // const arr = Object.keys(cartItemResult).map(key => ({ key, value: cartItemResult[key] }));
    if(orderItemRes)
    return res.status(200).json({message:"Order placed successfully..."})
    return res.status(401).json({message:"Something went wrong"})
}

 

   
