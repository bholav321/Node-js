import pool from "../database/dbConfig.js"

class OrderItem {
    constructor(id,quantity,userId,productId,orderId){
        this.id = id;
        this.quantity = quantity;
        this.userId = userId;
        this.productId = productId;
        this.orderId = orderId;
    }
    setOrderItem(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err) reject(err);
                else{
                    let sql = "insert into order_item(Quantity,userId,productId,orderId) values(?,?,?,?)"
                    con.query(sql,[this.quantity,this.userId,this.productId,this.orderId],(err,result)=>{
                        err?reject(err):resolve(result);
                    })
                }
            })
        })
    }
}


export default OrderItem;