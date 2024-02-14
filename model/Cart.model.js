import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";

const Cart = sequelize.define("cart",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }, 
    userId:{
        type:DataTypes.INTEGER,
        foreignKey :true
    },
   
} ,{
    timestamps:true,
    timezone:'+05:30'
});

Cart.sync().then(()=>{
    console.log("Cart table created..")
}).catch(err=>{
    console.log(err)
});



export default Cart;
 