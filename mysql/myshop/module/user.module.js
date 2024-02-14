import pool from "../database/dbConfig.js";

class User{
    constructor(id,username,password,email,contact){
        this.id  = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.contact = contact;
    }

    singUp(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "insert into user(username, password,email,contact) values(?,?,?,?)";
                    con.query(sql,[this.username,this.password,this.email,this.contact],(err,result)=>{
                        err ? reject(err):resolve(result);
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
                    let sql = "select * from user where username = ? and password = ?";
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
                    let sql = "select *from user";
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
                    let sql = "delete from user";
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
                    let sql = "update user set username = ? where id = ?";
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
                    let sql = "update user set password = ? where id = ?";
                    con.query(sql,[this.password,this.id],(err,result)=>{
                        err ? reject(err):resolve(result);
                        con.release();
                    })
                }

            })
        })
    }

}


export default User;