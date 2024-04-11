import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { Order } from "./order.model.js";


const payment = sequelize.define('payment',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    paymentmethod:{
        type: DataTypes.STRING,
        allowNull:false
    },
    paymentdate:{
        type: DataTypes.STRING,
        allowNull:true
    },
    PaymentAmount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    transactionID:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    }
})



payment.sync()
.then(()=>{
    console.log("payment table created.....");
})
.catch(err=>{
    console.log(err);
})


export default payment