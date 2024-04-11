import {cartItem} from "../model/cartItem.model.js";
import { User } from "../model/user.model.js";
import Cart from "../model/Cart.model.js";
import { product } from "../model/product.model.js";

import sequelize from "../Connection/db.js";
import { validationResult } from "express-validator";

export const removeItemFromCart = async (req, res, next) => {
    let {userid, productId} = req.params;
    console.log(userid + " " + productId)
    let cart = await Cart.findOne({ where: { userId: userid } });
    await cartItem.destroy({ where: { productId: productId, cartId: cart.id }, raw: true }).then((result) => {
        return res.status(200).json({ message: "Product removed successfully..", product: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Internal server error" })
    });
}
export const removeAllItems = async(req,res,next)=>{
    let {userId} = req.params;
    let cart = await Cart.findOne({ where: { userId} });
    await cartItem.destroy({ where: { cartId: cart.id }, raw: true }).then((result) => {
        return res.status(200).json({ message: "Product removed successfully..", product: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Internal server error" })
    });
}
export const removeProductFromCart = (req,res,next)=>{
    let productId = req.body.productId;
    console.log(productId);
    cartItem.destroy({where:{productId:productId}}).then((result)=>{
        return res.status(200).json({message:"Product removed successfully..",product:result})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error", error: err})
    });
}

export const addToCart = async (request,response,next)=>{
    let transaction = await sequelize.transaction();
    try{  
      const errors = validationResult(request);
      if(!errors.isEmpty())
        return response.status(401).json({error: "Bad request..."});
      let {userId,productId} = request.body;
      // select * from cart where userId = 1
      let cart = await Cart.findOne({raw: true, where:{userId: userId*1}});
      if(cart){
        let isExists =  !! await cartItem.findOne({raw: true, where:{cartId: cart.id,productId}});
        if(isExists)
          return response.status(200).json({message: "Product is already added in cart"});
      
        await cartItem.create({cartId: cart.id, productId},{transaction});
        await transaction.commit();
        return response.status(201).json({message: 'Product successfully added into cart'});   
      }
      else{
          // user first time performing add to cart
          // First create user cart  (carts)
          cart = await Cart.create({userId: userId*1},{transaction})
          .then(result=>{return result.dataValues});
          
          await cartItem.create({cartId: cart.id,productId: productId},{transaction})
          .then(result=>{return result.dataValues});
          
          await transaction.commit();
  
          return response.status(201).json({message: "Item Successfully added into cart"});
      }
    }
    catch(err){
      await transaction.rollback();
      console.log(err);
      return response.status(500).json({error: 'Internal Server Error...'});
    }
  }

export const getCartId = (req,res,next)=>{
    Cart.findOne({where:{userId:req.body.userId}}).then(result=>{
        return res.status(200).json({message:"User cart",User:result})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error..."})
    });
}


export const viewProductByCartID =(request,response)=>{
    cartItem.findAll({where:{cartId:request.params.cartId}}).then(result=>{
        return response.status(200).json({message:"User carts Items",User:result})
    }).catch(err=>{
        console.log(err);
        return response.status(401).json({message:"Internal server error..."})
    });
}


export const viewAllCarts = (req,res,next)=>{
    console.log("Cart called..");
    const userId = req.body.userId;
    User.findAll({
        include:[
            {
                model:Cart,
                required:true,
                where:{userId}
            }
        ]
    }).then(result=>{
        return res.status(200).json({message:"User carts",User:result})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error..."})
    });
}

export const fetchCartItems = (request,response,next)=>{
    Cart.findAll({raw: true, where:{userId: request.params.userId*1},
    include:[{model: product, required: true}]})
    .then(result=>{
      return response.status(200).json({data: result});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Internal Server Error"});
    });
    
}
export const viewAllCartProducts = (req,res,next)=>{
    console.log("Cart called..")
    cartItem.findAll({
        include:[
            {
                model:Cart,
                required:true
            }
        ]
    }).then(result=>{
        return res.status(200).json({message:"User carts",cartItems:result})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error..."})
    });
}