import Cart from "../module/cart.module.js";
import CartItem from "../module/cartItem.module.js";

export const addToCart = async (request,response,next)=>{
  try{ 
   let userId = request.body.userId;
   let productId = request.body.productId;
    let quantity = request.body.quantity;
   let result = await Cart.isCartExist(userId);
   if(result.length){
      let cartId = result[0].id;
      await CartItem.addToCart(cartId,productId,quantity);
      return response.status(200).json({message: 'Item saved in cart'});
   }   
   else{
       let result = await Cart.createCart(userId);
       console.log(result);
       let cartId = result[0].id;
       await CartItem.addToCart(cartId,productId);
       return response.status(200).json({message: 'Item saved in cart'});
   }
  }catch(err){
   console.log(err);
   return response.status(500).json({error : 'Internal Server Error'});
  }
}