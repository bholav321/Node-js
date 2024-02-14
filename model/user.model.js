import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import bcrypt from 'bcryptjs';
import  Cart  from "./Cart.model.js";
export const User = sequelize.define("user",{
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
    }
})

User.checkPass = (originalPass,encrptedPassword) =>{
    return bcrypt.compareSync(originalPass,encrptedPassword);
}

sequelize.sync().then(()=>{
    console.log("table created successfully...")
}).catch((err)=>{
    console.log(err)
    console.log("kuchh glt h (user)")
})

User.hasOne(Cart,{
    foreignKey:'userId',
    onDelete:'CASCADE'
});

Cart.belongsTo(User,{
    foreignKey:'userId',
    onDelete:"CASCADE"
});

