import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import { User } from "./user.model.js";
import { product } from "./product.model.js";

const Review = sequelize.define("review",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    comment:{
        allowNull:false,
        type:DataTypes.STRING(1024),
    },
    rating:{
        allowNull:false,
        type:DataTypes.FLOAT,
    },
})

Review.sync().then(()=>{
    console.log("Review table is created")
}).catch(err=>{
    console.log("error in review table "+err);
});

User.hasMany(Review, {  foreignKey: 'userId' });
Review.belongsTo(User, {  foreignKey: 'userId' });


export default Review;

