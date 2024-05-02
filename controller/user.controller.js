import { User } from "../model/user.model.js"
import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'

export const signUp = (req, res, next) => {
    let error = validationResult(req)
    if (!error.isEmpty())
        return res.status(401).json({ Error: error })

    // let originalpassword = request.body.password;
    // let saltkey = bcrypt.genSaltSync(10);
    // let encryptedpassword = bcrypt.hashSync(originalpassword, saltkey);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact

    }).then(result => {
        return res.status(200).json({ message: "User Sign up successfully...", user: result })
    }).catch(err => {
        console.log(err)
        return res.status(401).json({ message: "kuchh glt h..." })
    })
}


export const addUsers = (req, res, next) => {
    const users = req.body;
    let error = validationResult(req)
    if (!error.isEmpty())
        return res.status(401).json({ Error: error })

    try{
        for(let user of users){
            User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            contact: user.contact
            })
        }
        return res.status(200).json({ message:"all users added into table..." })
    }catch(err){
        console.log(err)
        return res.status(400).json({ message:"internal server error" })
    }

}

export const userList = (req, res, next) => {
    User.findAll({ raw: true }).then(result => {
        console.log(result)
        return res.status(200).json({ users: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Something went wrong" })
    });
}

export const findByEmail = (req, res, next) => {

    User.findOne({ where: { email: req.body.email } }).then(result => {
        return res.status(200).json({ user: result })
    }).catch(err => {
        return res.status(401).json({ message: "Something went wrong" })
    });
}


export const removeUser = (req, res, next) => {
    User.destroy({ where: { email: req.body.email } }).then(result => {
        return res.status(200).json({ message: "user removed successfully...", user: result })
    }).catch(err => {
        return res.status(401).json({ message: "Something went wrong" })
    });
}


export const updatePassword = async (req, res, next) => {
    try {
        const { email, password, newPassword } = req.body;
        console.log(email, password, newPassword);

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized User..." });
        }
        const isPasswordCorrect = await User.checkPass(password, user.dataValues.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password does not match" });
        }

        // Update the password
        await User.update({ password: newPassword }, { where: { email } });

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



export const resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized User..." });
        }

        // Update the password
        await User.update({ password }, { where: { email } });

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const signIn = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email+" "+password)
    let user = await User.findOne({ where: { email }});
    if (user) {
        if (await User.checkPass(password, user.password))
            return res.status(200).json({ message: "Sign in successfully...", user });
        return res.status(401).json({ message: "Unathorized user access" });
    }
    return res.status(401).json({ message: "Unathorized User..." });
}

