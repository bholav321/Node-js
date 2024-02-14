import { DeliveryData } from "../model/deliveryData.model.js";

export const orderDeliver = (req,res,next)=>{
    let deliveryBoyId = req.body.deliveryBoyId;
    let ordersId = req.body.ordersId;
    let orderItemId = req.body.orderItemId;
    
}