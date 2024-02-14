import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { User } from "./user.model.js";
export const Order = sequelize.define("Order",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    OrderDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    UserContact:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        foreignKey:true,
        allowNull:false,
        references:{
            model : User,
            key : 'id'
        }
    }
});

Order.belongsTo(User,{ 
    foreignKey:'userId',
    onDelete:'CASCADE'
})

Order.sync().then(()=>{
    console.log("Order table created ")
}).catch(err=>{
    console.log(err)
});

