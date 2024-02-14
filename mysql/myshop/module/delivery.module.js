import pool from "../database/dbConfig.js"

class DeliveryData{
    constructor(userId,deliveryboyId,orderDataId,order_itemId){
        this.userId = userId;
        this.deliveryboyId = deliveryboyId;
        this.orderDataId = orderDataId;
        this.order_itemId = order_itemId;
    }

    getOrder(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err)
                else{
                    let sql = "select *from orderdata where userId = ?";
                    con.query(sql,[this.userId],(err,result)=>{
                        err?reject(err):resolve(result);
                    })
                }
            })
        })
    }
    getOrderItem(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err)
                else{
                    let sql = "select *from order_item where userId = ?";
                    con.query(sql,[this.userId],(err,result)=>{
                        err?reject(err):resolve(result);
                    })
                }
            })
        })
    }

    setOrderItems(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err)
            else{
                let sql = "insert into deliverydata(deliveryboyId,orderDataId,order_itemId) values(?,?,?);"
                con.query(sql,[this.deliveryboyId,this.orderDataId,this.order_itemId],(err,result)=>{
                    err?reject(err):resolve(result);
                })
            }
            })
        })
    }
}

export default DeliveryData;