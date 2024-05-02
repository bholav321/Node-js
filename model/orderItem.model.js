// orderItem.model.js
import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { product } from "./product.model.js";
import { Order } from "./order.model.js";

export const orderItem = sequelize.define("orderItem",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }, 
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    productId:{
        type:DataTypes.INTEGER
    }
});

orderItem.belongsTo(Order, { foreignKey: 'orderId' }); // An order item belongs to an order
Order.hasMany(orderItem, { foreignKey: 'orderId' }); 

orderItem.sync().then(()=>{
    console.log("orderItem table created ")
}).catch(err=>{
    console.log(err)
});
