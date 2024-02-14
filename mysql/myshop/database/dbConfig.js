import mysql from "mysql2";

export default mysql.createPool({
    user:"root",
    password:"root",
    host:"localhost",
    database:"shop",
    connectionLimit : 100
});


