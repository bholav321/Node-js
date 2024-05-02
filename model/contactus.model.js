import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
 const ContactUs = sequelize.define("ContactUs", {
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
      },
      name: {
            type: DataTypes.STRING,
            allowNull: false
      },
      email: {
            type: DataTypes.STRING(200),

            allowNull: false
      },
      contact: {
            type: DataTypes.STRING(10),
            unique: true
      },
      message: {
             type:DataTypes.STRING(1024),
             allowNull:false
      },
 
})


sequelize.sync().then(() => {
      console.log(" Contact Information table created successfully...")
}).catch((err) => {
      console.log(err)
      console.log("kuchh glt h contactInformation me")
})

export default ContactUs;