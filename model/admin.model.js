import { DataTypes } from "sequelize";
import sequelize from "../Connection/db.js";
import bcrypt from 'bcryptjs';

export const Admin = sequelize.define("Admin", {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(valuse) {
            let saltKey = bcrypt.genSaltSync(10)
            let encrptedPassword = bcrypt.hashSync(valuse, saltKey);
            this.setDataValue("password", encrptedPassword);
        }
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['contact', 'email']
        }
    ]
})

Admin.checkPassword = (originalPass, encrptedPassword) => {
    return bcrypt.compareSync(originalPass, encrptedPassword);
}

sequelize.sync().then(() => {
    console.log("table created successfully...")
}).catch((err) => {
    console.log(err)
    console.log("kuchh glt h admin")
})
