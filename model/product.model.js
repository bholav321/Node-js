import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { cartItem } from "./cartItem.model.js";
import Cart from "./Cart.model.js";
import { User } from "./user.model.js";
import Wishlist from "./wishlist.model.js";
import Review from "./review.model.js";
import { orderItem } from "./orderItem.model.js";

export const product = sequelize.define("product",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING(500),  
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING(1000),
        allowNull:false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    discountPercentage:{
        type:DataTypes.FLOAT,
    },
    stock:{
        type:DataTypes.INTEGER,
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
        unique:true
    },
    images:{
        type:DataTypes.STRING(2000)
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

User.belongsToMany(product,{through:Wishlist});
product.belongsToMany(User,{through:Wishlist});

User.belongsToMany(product,{through:Review});
product.belongsToMany(User,{through:Review});

orderItem.belongsTo(product, { foreignKey: 'productId' });
product.hasMany(orderItem, { foreignKey: 'productId' });

product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(product, { foreignKey: 'productId' });