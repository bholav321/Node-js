import Admin from "../module/admin.module.js";
import pool from "../database/dbConfig.js";
import PromptSync from "prompt-sync";
import { category } from "./category.controller.js";
var prompt = PromptSync();

export const signUp = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    let admin = new Admin(null, username, password);
    admin.signUp().then(result => {
        res.status(200).json({ message: "sign up success.. " });
    }).catch(err => {
        res.status(401).json({ message: "internal server error.." })
    })
}

export const signIn = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    let admin = new Admin(null, username, password);
    admin.signIn().then(result => {
        console.log("Sign in successed");
        res.status(200).json({ message: "sign in success...", data: { username, password } });
    }).catch(err => {
        console.log("Sign in failed")
        res.status(401).json({ message: "internal server error..." })
    })
}

export const deleteData = (req, res, next) => {

    Admin.deleteData().then(result => {
        console.log("Data deleted Successfully..");
        res.status(200).json({ message: "Delete successed" });
    }).catch(err => {
        res.status(401).json({ message: "Data deleted successfully" })
    })
}

export const show = (req, res, next) => {
    Admin.show().then(result => {
        console.log("Sign in successed");
        res.status(200).json({ message: "Admin data ", data: { result } });
    }).catch(err => {
        console.log("Data not found")
        res.status(401).json({ message: "internal server error..." })
    })
}


export const update = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let id = req.body.id;
    console.log("what do you want to update ?")
    console.log("Press 1 for username, Press 2 for password ")
    let choice = prompt("Enter your choice ")
    let admin = new Admin(id, username, password);
    switch (choice) {
        case '1':
            admin.updateUsername().then(result => {
                console.log("username update successfully ");
                res.status(200).json({ message: "Detail update successfully", data: { username, password } });
            }).catch(err => {
                console.log("data not found")
                res.status(401).json({ message: "Unathorised access.." })
            });
            break;
        case '2':
            admin.updatePassword().then(result => {
                console.log("password update successfully ");
                res.status(200).json({ message: "Detail update successfully", data: { username, password } });
            }).catch(err => {
                console.log("data not found")
                res.status(401).json({ message: "Unathorised access.." })
            });
    }


}


export const product = (req, res, next) => {
   let categoryId = req.body.category; 
   let title = req.body.title;
   let description = req.body.description;
   let brand = req.body.brand;
   let price = req.body.price;
   let thumbnail = req.body.thumbnail;
    pool.getConnection((err, con) => {
        if(err){
            console.log(err);
        }
        else{
            let sql = "insert into product(Product_Name,Decription,Brand,Price,Image_Url,categoryId) values(?,?,?,?,?,?)"
        con.query(sql, [title, description, brand, price, thumbnail, categoryId], (err, result) => {
            if(err){
                res.status(401).json({message:"internal server error "})
            }   
            else{
                console.log("Product added...")
                res.status(200).json({message:"Product added successfully "})
            }
        })
        }
    })
}