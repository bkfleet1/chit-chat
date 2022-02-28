const mysql = require("mysql2");
require('dotenv').config();

const DB_NAME = process.env.DB_NAME

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
});



con.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfully to MySQL.");
    let sql1 = `DROP DATABASE IF EXISTS ${DB_NAME}`;
    let sql2 = `CREATE DATABASE ${DB_NAME}`;
    con.query(sql1, function (err, result) {
        if (err) throw err;
        console.log(`Database ${DB_NAME} was dropped successfully`);
        con.query(sql2, function (err, result) {
            if (err) throw err;
            console.log(`Database ${DB_NAME} was created successfully`);
            process.exit(1);
        });
    });
});
