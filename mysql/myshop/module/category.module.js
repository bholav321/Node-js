// import { category } from "../controller/admin.controller.js";
import pool from "../database/dbConfig.js"


class Category {
    constructor(id, categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }
    pushCategory() {
        return new Promise((resolve, reject) => {
                pool.getConnection((err, con) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let sql = "insert into category(id,category_Name) values(?,?)";
                        con.query(sql, [this.id, this.categoryName], (err, result) => {
                            err ? reject(err) : resolve(result);
                            con.release();
                        })
                    }
                })
        })
    }

    addCategory() {
        return new Promise((resolve, reject) => {
                pool.getConnection((err, con) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let sql = "insert into category(category_Name) values(?)";
                        con.query(sql, [this.id, this.categoryName], (err, result) => {
                            err ? reject(err) : resolve(result);
                            con.release();
                        })
                    }
                })
        })
    }
    deleteCategory(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    reject(err);
                }
                else {
                    let sql = "delete from category where id = ?";
                    con.query(sql, [this.id], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
            })
    })
    }

    
    static showCategory(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "select *from category";
                    con.query(sql,(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

}

export default Category;

