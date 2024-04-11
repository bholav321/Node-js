import { raw } from "mysql2";
import Cart from "../model/Cart.model.js";
import { cartItem } from "../model/cartItem.model.js";
import { Order } from "../model/order.model.js";
import { orderItem } from "../model/orderItem.model.js";
import { product } from "../model/product.model.js";

export const placedOrder =async (req,res,next)=>{
    let date = new Date();
    let currentDate = date.toString().split("GM")[0];
    // console.log(currentDate)
    let {userId,firstName,lastName,contact,address,city,quantity,pinCode,status} = req.body;
    let cartResult= await Cart.findOne({where:{userId:userId}});
    let cartId = cartResult.dataValues.id;
    let cartItemResult = await cartItem.findAll({where:{cartId:cartId},raw:true});
    // await cartItem.destroy({where:{cartId:cartId}});
    let orderItemRes;
    for(let i=0; i<cartItemResult.length; i++){
         let productId = cartItemResult[i].productId;
       await  Order.create({
            orderDate:currentDate,firstName,lastName,contact,address,pinCode,city,status,userId
        });
        let orderId = await Order.findAll({where:{OrderDate:currentDate},raw:true})
        orderId = orderId[i].id;
        console.log("orderid :"+orderId);
        orderItemRes =   await orderItem.create({
            productId:productId,    
            quantity:quantity,  
            OrderId:orderId
        })
    }   
    // const arr = Object.keys(cartItemResult).map(key => ({ key, value: cartItemResult[key] }));
    if(orderItemRes)
    return res.status(200).json({message:"Order placed successfully..."})
    return res.status(401).json({message:"Something went wrong"})
}

 export const viewAllOrderList = (req,res,next)=>{
    orderItem.findAll({
        include:[
            {model:Order,
            required:true}
        ]
    }).then(result=>{
        return res.status(200).json({message:"Your orders ",result})
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({message:"Internal server error ",err})
    }
    );
}

export const viewParticularUserOrder = (req,res,next)=>{
    orderItem.findAll({
        include:[
            {model:Order,
            required:true,where:{
                userId:req.body.userId
            }}
        ]
    }).then(result=>{
        return res.status(200).json({message:"Your orders ",result})
    }).catch(err=>{
        console.log(err)
        return res.status(400).json({message:"Internal server error ",err})
    }
    );
}

Order.hasMany(orderItem);
orderItem.belongsTo(Order);   

