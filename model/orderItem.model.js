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
    productId:{
        type:DataTypes.INTEGER,
        foreignKey:true,
        allowNull:false,
        references:{
            model:product,
            key:'id'
        }
    }, 
    Quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    orderId:{
        type:DataTypes.INTEGER,
        foreignKey:true,
        allowNull:false,
        references:{
            model:Order,
            key:'id'
        }
    }
})


orderItem.belongsTo(product,{
    foreignKey:'productId',
    onDelete:'CASCADE'
})


orderItem.sync().then(()=>{
    console.log("orderItem table created ")
}).catch(err=>{
    console.log(err)
});