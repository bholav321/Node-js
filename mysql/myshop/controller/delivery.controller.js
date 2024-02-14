import DeliveryData from "../module/delivery.module.js";
// import DeliveryBoy from "../module/deliveryBoy.module.js";

export const getOrder = async(req,res,next)=>{
    let userId = req.body.userId;
    let boyId = req.body.boyId;
    let obj = new DeliveryData(userId,null,null,null)
    let error;
    let orderdata = await obj.getOrder();
    // console.log(orderdata)
    let order_item = await obj.getOrderItem();
    for(let i=0; i<order_item.length; i++){
        let orderId = orderdata[i].orderId;
        let orderItemId = order_item[i].id;
        let object = new DeliveryData(userId,boyId,orderId,orderItemId)
        error = await object.setOrderItems();
    }
  
    if(!orderdata.length){
    console.log(error);
    res.status(401).json({message:"Internal server error...."})
}
    else{
        console.log("Order delivered successfully...")
        res.status(200).json({message:"Order placed..."})
    }
}