import { Admin } from "../model/admin.model.js"
import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'

export const signUp = (req,res,next) =>{
    let error = validationResult(req)
    if(!error.isEmpty())
        return res.status(401).json({Error:error})
    Admin.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        contact:req.body.contact
    }).then(result=>{
        return res.status(200).json({message:"Admin Sign up successfully...",admin:result})
    }).catch(err=>{
        console.log(err)
        return res.status(401).json({message:"kuchh glt h..."})
    })
}


export const findByEmail = (req,res,next) =>{

    Admin.findOne({where:{email:req.body.email}}).then(result=>{
        return res.status(200).json({message:result})
    }).catch(err=>{
        return res.status(401).json({message:"Something went wrong"})
    });
}


export const updatePassword =  (req,res,next) =>{
    console.log("called...")
    let email = req.body.email; 
      Admin.update({password : req.body.password},{where:{email:email}}).then(result=>{
            return res.status(200).json({message:"password updated successfully..."})
        }).catch(err=>{
            console.log(err);
            return res.status(401).json({message:"Something went wrong"})
        });
}

export const signIn = async(req,res,next) =>{
    let email = req.body.email;
    let password = req.body.password;
   let user = await  Admin.findOne({where:{email:email},raw:true});
   if(user){
    if(Admin.checkPass(password,user.password))
        return res.status(200).json({message:"Sign in successfully..."});
    return res.status(401).json({message:"Unathorized user access"});
   }
   return res.status(401).json({message:"Unathorized Admin..."});
}

