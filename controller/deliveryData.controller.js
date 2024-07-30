import { DeliveryData } from "../model/deliveryData.model.js";
import { Order } from "../model/order.model.js";
import { orderItem } from "../model/orderItem.model.js";
import { product } from "../model/product.model.js";
import { User } from "../model/user.model.js";

export const orderDeliver = (req,res,next)=>{
    let deliveryBoyId = req.body.deliveryBoyId;
    let orderItemId = req.body.orderItemId;
    let userId = req.body.userId;
    DeliveryData.create({
        deliveryBoyId,userId,orderItemId
    }).then(result=>{
        console.log("order delivered..")
        return res.status(200).json({message:"Order delivered successfully...",result})
    }).catch(err=>{
        console.log(err)
        return res.status(401).json({message:"Internal server error..."})
    });
}

export const orderDetail = (req, res, next) => {
    DeliveryData.findAll({
        include: [
            {
                model: orderItem,
                include:[
                    {
                        model:Order,
                        include:[
                            {model:User}
                        ]
                    }
                ],
            },
            {
                model:orderItem,
                    include: [
                        {
                            model: product, // Include the Product model
                            as: 'product', // Alias for the product model if specified in associations
                        }
                    ],
            }

        ]
    }).then((result) => {
        return res.status(200).json({ message: "Order details...", result });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ message: "Internal server error..." });
    });
};


export const deliveryBoyOrder = (req, res, next) => {
    const deliveryBoyId = req.body.deliveryBoyId;
    DeliveryData.findAll({
        where: { deliveryBoyId:deliveryBoyId }, // Adding the orderId condition
        include: [
            {
                model: orderItem,   
                include: [
                    {
                        model: Order,
                        include: [
                            { model: User }
                        ]
                    }
                ]
            },
            {
                model: orderItem,
                include: [
                    {
                        model: product, // Ensure the model name matches your setup
                        as: 'product', // Alias for the product model if specified in associations
                    }
                ]
            }
        ]
    }).then((result) => {
        return res.status(200).json({ message: "Order details...", result });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ message: "Internal server error..." });
    });
}