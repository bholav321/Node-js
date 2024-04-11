import { DeliveryData } from "../model/deliveryData.model.js";

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