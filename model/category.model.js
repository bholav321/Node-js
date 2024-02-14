import { DataTypes } from "sequelize";
import { product } from "./product.model.js";
import sequelize from "../Connection/db.js";

export const Category = sequelize.define("category",{
    categoryName:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    }
},{
    timestamps:false
}) 

Category.sync().then(()=>{
    console.log("category table created ")
}).catch(err=>{
    console.log(err)
});

Category.hasMany(product,{
    foreignKey:'categoryName',
    onDelete:'CASCADE'
})

product.belongsTo(Category,{
    foreignKey:'categoryName', 
    onDelete:'CASCADE'
})