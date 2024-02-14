import pool from "../database/dbConfig.js"

class CartItem{
    constructor(id,cartId,productId){
        this.id = id;
        this.cartId = cartId;
        this.productId = productId;
    }
  static addToCart(cartId,productId,quantity){
        return new Promise((resolve,reject)=>{
            let sql;
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(quantity==null){
                         sql = "insert into cartitem(cartId,productId) values(?,?)"
                    }else{
                         sql = "insert into cartitem(cartId,productId,quantity) values(?,?,?)"
                    }
                    con.query(sql,[cartId,productId,quantity],(err,result)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                    })
                }
            })
        })
    }

   static  totalPrice(cartId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                   let sql = "select product.id, product.product_name,cartiD,  quantity, product.price,(quantity*product.price) AS Total from product inner join cartitem on cartitem.productid = product.id where cartId = ?;";
                    con.query(sql,[cartId],(err,result)=>{
                        err?reject(err):resolve(result);
                    })
                }
            })
        })
    }

   static deleteItems(cartId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err)
            else{
                let sql = 'delete from cartitem where cartid = ?'
                con.query(sql,[cartId],(err,result)=>{
                    err?reject(err):resolve(result);
                })
            }
            })
        })
    }

    removeFromCart(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                   let sql = "delete from cartitem where productId = ?";
                    con.query(sql,[this.productId],(err,result)=>{
                        err?reject(err):resolve(result);
                    })
                }
            })
        })
    }
}

export default CartItem;