import pool from "../database/dbConfig.js"

class DeliveryBoy{
    constructor(id,email,password,contact){
        this.id = id;
        this.email = email;
        this.password = password;
        this.contact = contact;
    }
    signUp(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err)
                reject(err)
                else{
                    let sql = "insert into delivery_boy(email,password,contact) values(?,?,?);";
                    con.query(sql,[this.email,this.password,this.contact],(err,result)=>{
                        err?reject(err):resolve(result);
                    })

                }
            })
        });
    }

    signIn(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sql = "select * from delivery_boy where email = ? and password = ?";
                    con.query(sql,[this.email,this.password],(err,result)=>{
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
}

export default DeliveryBoy;