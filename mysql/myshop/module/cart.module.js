import pool from "../database/dbConfig.js";

class Cart {
    constructor(id, userId) {
        this.id = id;
        this.id = userId;
    }

    static isCartExist(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    let sql = "select * from cart where userId = ?";
                    con.query(sql, [userId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            });
        });

    }

    static createCart(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    let sql = "insert into cart(userId) values(?)";
                    con.query(sql, [userId], (err, result) => {
                        if (err)
                            reject(err);
                        else {
                            let sql = "select * from cart where userId = ?";
                            con.query(sql, [userId], (err, result) => {
                                con.release();
                                err ? reject(err) : resolve(result);
                            });
                        }
                    })
                }
            });
        });
    }
  static  cartId(userId) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) reject(err);
                else {
                    let sql = "select id from cart where userId = ?";
                    con.query(sql, [userId], (err, result) => {
                        con.release();
                        err ? reject(err) : resolve(result);
                    });
                }
            });
        });
    }
}

export default Cart;