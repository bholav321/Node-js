import {cartItem} from "../model/cartItem.model.js";
import { User } from "../model/user.model.js";
import Cart from "../model/Cart.model.js";
import sequelize from "../Connection/db.js";

export const addToCart = async (request, response, next) => {
    let userId = request.body.userId;
    let productId = request.body.productId;
    let transaction = await sequelize.transaction();
    let result = await Cart.findOne({where:{userId: userId}})
    console.log(result);
    if(result){
        let cartId = result.id;
        console.log(cartId);
        cartItem.create({
            cartId : cartId,
            productId : productId,
            quantity : request.body.quantity
        },{transaction})
        .then(res=>{
            transaction.commit();
            return response.status(200).json({message:"Item saved in cartItem"})
        })
        .catch(err=>{
            console.log(err)
            return response.status(400).json({error: "Internal server error"})
        })
    }else{
        Cart.create({
            userId : userId
        },{transaction})
        .then(result=>{
            transaction.commit();
            let cartId = result.id;
            console.log(cartId);
             cartItem.create({
                cartId : cartId,
                productId: productId,
                quantity : request.body.quantity
             }).then(res=>{
                return response.status(200).json({message: 'Item saved in cartItem'})
             })
             .catch(err=>{
                transaction.rollback();
                return response.status(400).json({error : 'Internal server error'})
             })
        })
    }   
}

export const viewAllCarts = (req,res,next)=>{
    console.log("Cart called..")
    User.findAll({
        include:[
            {
                model:Cart,
                required:true
            }
        ]
    }).then(result=>{
        return res.status(200).json({message:"User carts",User:result})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error..."})
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