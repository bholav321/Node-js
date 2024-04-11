import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { User } from "./user.model.js";

import { product } from "./product.model.js";
const Wishlist = sequelize.define("Wishlist",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
});

Wishlist.sync().then(()=>{
    console.log("wishlist table created..")
}).catch(err=>{
    console.log("error in wishlist table"+err)
});
User.hasMany(Wishlist);
Wishlist.belongsTo(User);

export default  Wishlist; 