
import pool from "../database/dbConfig.js"

class Product{
    constructor(id,title,description,brand,price,thumbnail){
         this.id = id; 
         this.title = title;
         this.description = description;
         this.brand = brand;
         this.price = price;
        this.thumbnail = thumbnail;
    }

    static showById(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = " select category.category_Name, product_name, product.price, product.brand,product.decription from product inner join category on product.categoryId = category.id where category.id = ?";
                    con.query(sql,[id],(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

    static showByCategory(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "SELECT category.category_Name, product.product_name, product.price, product.Decription FROM category INNER JOIN product ON category.id = product.categoryid;";
                    con.query(sql,(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

    static productList(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "select *from product";
                    con.query(sql,(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

    addProduct(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err, con) => {
                if(err){
                    console.log(err);
                }
                else{
                    let sql = "insert into product(Product_Name,Decription,Brand,Price,Image_Url,categoryId) values(?,?,?,?,?,?)"
                    con.query(sql, [this.title, this.description, this.brand, this.price, this.thumbnail, this.id], (err, result) => {
                    if(err){
                       return reject(err);
                    }   
                    else{
                        return resolve(result);
                    }
                })
                }
            })
        });
    }

   static deleteProdcut(productId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "delete from product where id = ?";
                    con.query(sql,[productId],(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }
}

export default Product