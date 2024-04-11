import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";

const Review = sequelize.define("review",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    comment:{
        type:DataTypes.STRING(1024),
    },
    rating:{
        type:DataTypes.INTEGER,
    },
})

Review.sync().then(()=>{
    console.log("Review table is created")
}).catch(err=>{
    console.log("error in review table "+err);
});

export default Review;