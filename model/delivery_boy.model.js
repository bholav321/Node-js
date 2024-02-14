import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import bcrypt from 'bcryptjs';

export const deliveryBoy = sequelize.define("deliveryBoy",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{ 
        type:DataTypes.STRING, 
        allowNull:false,
        set(valuse){
            let saltKey = bcrypt.genSaltSync(10)
            let encrptedPassword = bcrypt.hashSync(valuse,saltKey);
            this.setDataValue("password",encrptedPassword);
        }
    },
    contact:{
        type:DataTypes.STRING(10),
        unique:true,
        allowNull:false
    }
},{  
    timestamps:true, 
}) 

deliveryBoy.checkPass = (originalPass,encrptedPassword) =>{
    return bcrypt.compareSync(originalPass,encrptedPassword);
}

sequelize.sync().then(()=>{
    console.log("table delivery boy created successfully...")
}).catch((err)=>{
    console.log(err)
    console.log("kuchh glt h (deliveryboy)") 
})

// User.hasOne(Cart,{
//     foreignKey:'userId',
//     onDelete:'CASCADE'
// });

// Cart.belongsTo(User,{
//     foreignKey:'userId',
//     onDelete:"CASCADE"
// });

