import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import  Cart  from "./Cart.model.js";

export const cartItem = sequelize.define("cartItem", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Quantity:{
        type:DataTypes.INTEGER,
        allowNull:false, 
        defaultValue:1
    }
   
},{
    timestamps:true,
    timezone:'+05:30' 
});

cartItem.sync().then(()=>{
    console.log("CartItem table created..")
}).catch(err=>{
    console.log(err)
});


cartItem.hasMany(Cart,{
    foreignKey:'id',
    onDelete: 'CASCADE' 
}); 
cartItem.belongsTo(Cart,{
    foreignKey:'cartId',
    onDelete: 'CASCADE' 
}); 

