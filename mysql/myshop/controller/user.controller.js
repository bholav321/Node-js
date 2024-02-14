import User from "../module/user.module.js";
import PromptSync from "prompt-sync";
import  Jwt  from "jsonwebtoken";
var prompt = PromptSync();

export const signUp = (req,res,next)=>{
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let contact = req.body.contact;

    let user  = new User(null,username,password,email,contact);
    user.singUp().then(result=>{
        res.status(200).json({message:"Sign up sucess..",data:{username,password}});
    }).catch(err=>{
        console.log(err);
        res.status(401).json({message:"Internal server error..."})
    })
}

export const signIn = (req,res,next) =>{
    let username = req.body.username;
    let password = req.body.password;

    let user = new User(null, username,password);
    user.signIn().then(result=>{
        if(result.length){
            let payload = {user:username};
            let token = Jwt.sign(payload,'fasdfasdfaasdfasdfajlksdfasf');
            res.status(200).json({message:"sign in success...", data:{username,password},token:token});
        }
        else
        res.status(401).json({message:"unathorised access...", data:{username,password}});
    }).catch(err=>{
        console.log("Sign in failed")
        res.status(500).json({message:"internal server error..."})
    })
}

export const deleteData = (req, res, next) => {

    User.deleteData().then(result => {
        console.log("Data deleted Successfully..");
        res.status(200).json({ message: "Delete successed"});
    }).catch(err => {
        res.status(401).json({ message: "Deleted successfully... " })
    })
}

export const show = (req, res, next) => {
    User.show().then(result => {
        console.log("Sign in successed");
        res.status(200).json({ message: "User data ", data: { result} });
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
    let user = new User(id, username, password);
    switch (choice) {
        case '1':
            user.updateUsername().then(result => {
                console.log("username update successfully ");
                res.status(200).json({ message: "Detail update successfully", data: { username, password } });
            }).catch(err => {
                console.log("data not found")
                res.status(401).json({ message: "Unathorised access.." })
            });
            break;
        case '2':
            user.updatePassword().then(result => {
                console.log("password update successfully ");
                res.status(200).json({ message: "Detail update successfully", data: { username, password } });
            }).catch(err => {
                console.log("data not found")
                res.status(401).json({ message: "Unathorised access.." })
            });
    }
}

