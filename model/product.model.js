import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { cartItem } from "./cartItem.model.js";
import Cart from "./Cart.model.js";
export const product = sequelize.define("product",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,  
        unique:true,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    discountPercentage:{
        type:DataTypes.FLOAT,
    },
    stock:{
        type:DataTypes.STRING,
    },
    brand:{
        type:DataTypes.STRING,
    },
    rating:{
        type:DataTypes.FLOAT,
    },
    categoryName:{
        type:DataTypes.STRING,
        foreignKey:true
    },
    brand:{
        type:DataTypes.STRING,
    },
    thumbnail:{
        type:DataTypes.STRING,
    },
    images:{
        type:DataTypes.STRING(1000)
    }
},{
    timestamps:false
});

product.sync().then(()=>{
    console.log("product table created..")
}).catch(err=>{
    console.log(err)
    console.log("product table")
});

// cartItem.hasMany(product,{
//     foreignKey:'productId',
//     onDelete:'CASCADE'
// })

cartItem.belongsTo(product,{
    foreignKey:'productId',
    onDelete: 'CASCADE' 
})
Cart.belongsToMany(product,{through:cartItem})
product.belongsToMany(Cart,{through:cartItem})