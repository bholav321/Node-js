import pool from "../database/dbConfig.js"

class Admin{
    constructor(id,username,password){
        this.id = id;
        this.username = username;
        this.password  = password;
    }
    signUp(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "insert into admin(username,password) values(?,?)";
                    con.query(sql,[this.username,this.password],(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

    signIn(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "select * from admin where username = ? and password = ?";
                    con.query(sql,[this.username,this.password],(err,result)=>{
                        if(err){
                           reject(err);
                        }
                        else if(result.length!=0){
                            resolve(result);
                        }
                        else
                        reject(err);
                    })
                }

            })
        })
    }

    static show(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "select *from admin";
                    con.query(sql,(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

    static deleteData(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "delete from admin";
                    con.query(sql,(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }
            })
        })
    }


    updateUsername(){
        // console.log(this.id+""+this.username)
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "update admin set username = ? where id = ?";
                    con.query(sql,[this.username,this.id],(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }

            })
        })
    }
    updatePassword(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "update admin set password = ? where id = ?";
                    con.query(sql,[this.password,this.id],(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }

            })
        })
    }

}

export default Admin;

