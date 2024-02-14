import pool from "../database/dbConfig.js"

class Order{
    constructor(id,Order_date,Total_price,delevered,contact,userId,status){
        this.id  = id;
        this.Order_date = Order_date;
        this.Total_price = Total_price;
        this.delevered = delevered;
        this.contact = contact;
        this.userId = userId;
        this.status = status;
    }

    orderPlaced(){
        return new Promise((resolve,reject)=>{
           pool.getConnection((err,con)=>{
            if(err) reject(err)
            else{
                let sql = "insert into orderdata(Order_date,Total_Price,delevered,contact,userId,status) values(?,?,?,?,?,?)"
            con.query(sql,[this.Order_date,this.Total_price,this.delevered,this.contact,this.userId,this.status],(err,result)=>{
                err?reject(err):resolve(result);
            })
                }
           })
        })
    }
    getOrderId(currentDate){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err) reject(err)
                else{
            let sql = "select orderid from orderdata where order_date = ?";
            con.query(sql,[currentDate],(err,result)=>{
                err?reject(err):resolve(result);
            })
        }
            })
        })
    }
  static  orderDetails(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err) reject(err)
                else{
                    let sql = "SELECT user.id, user.username, orderdata.orderid, orderdata.contact, orderdata.order_date, product.product_name,product.price, order_item.quantity FROM user INNER JOIN orderdata ON user.id = orderdata.userId INNER JOIN order_item ON orderdata.orderid = order_item.orderId INNER JOIN product ON order_item.productid = product.id;"
                    con.query(sql,(err,result)=>{
                        err?reject(err):resolve(result);
                    })
                }
            })
        })
    }
}

export default Order;