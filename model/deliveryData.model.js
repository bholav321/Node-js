import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { deliveryBoy } from "./delivery_boy.model.js";
import { Order } from "./order.model.js";
import { orderItem } from "./orderItem.model.js";

export const DeliveryData = sequelize.define("DeliveryData",{
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    deliveryBoyId:{
        foreignKey:true,
        allowNull:false
    },
    ordersId:{
        foreignKey:true,
        unique:true,
        allowNull:false
    },
    orderItemId:{
        foreignKey:true,
        unique:true,
        allowNull:false
    }
});

DeliveryData.sync().then(()=>{
    console.log("deliverydata table created...")
}).catch(err=>{
    console.log(err)
});


deliveryBoy.belongsTo(DeliveryData,{
    foreignKey:'deliveryBoyId',
    onDelete:'CASCADE',
    onDelete:'CASCADE'
})

Order.belongsTo(DeliveryData,{
    foreignKey:'ordersId',
    onDelete:'CASCADE',
    onDelete:'CASCADE'
})

orderItem.belongsTo(DeliveryData,{
    foreignKey:'orderItemId',
    onDelete:'CASCADE',
    onDelete:'CASCADE'
})