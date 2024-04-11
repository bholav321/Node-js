import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { product } from "./product.model.js";
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
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
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

// User.hasMany(orderItem,{
//     foreignKey:'userId',
//     onDelete: 'CASCADE'
// })
