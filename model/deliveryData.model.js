import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { deliveryBoy } from "./delivery_boy.model.js";
import { Order } from "./order.model.js";
import { orderItem } from "./orderItem.model.js";
import { User } from "./user.model.js";

export const DeliveryData = sequelize.define("DeliveryData",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER 
    }, 
    deliveryBoyId:{
        foreignKey:true,
        type:DataTypes.INTEGER,
        allowNull:false
    }, 
    orderItemId:{ 
        foreignKey:true,
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    }, 
    // orderDataId:{ 
    //     foreignKey:true,
    //     type:DataTypes.INTEGER,
    //     allowNull:false,
    //     unique:true
    // }, 
    userId:{ 
        foreignKey:true,
        type:DataTypes.INTEGER,
        allowNull:false, 
    }
});

DeliveryData.sync().then(()=>{
    console.log("deliverydata table created...")
}).catch(err=>{
    console.log(err)
});


DeliveryData.belongsTo(deliveryBoy,{
    foreignKey:'deliveryBoyId',
    onDelete:'CASCADE',
    onDelete:'CASCADE'
})

DeliveryData.belongsTo(User,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onDelete:'CASCADE'
})

DeliveryData.belongsTo(orderItem,{
    foreignKey:'orderItemId',
    onDelete:'CASCADE', 
    onDelete:'CASCADE'
})
