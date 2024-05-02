// order.model.js
import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { User } from "./user.model.js";
import payment from "./payment.model.js";
import { orderItem } from "./orderItem.model.js";

export const Order = sequelize.define("Order",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    orderId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    orderDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pinCode:{
        type:DataTypes.INTEGER,
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
});

payment.belongsTo(Order,{
    foreignKey:'orderId',
    onDelete: 'CASCADE'
});

Order.sync().then(()=>{
    console.log("Order table created ")
}).catch(err=>{
    console.log(err)
});

