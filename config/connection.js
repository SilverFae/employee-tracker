const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: 'root',
    password: 'Maddie187!',
    database: "employee_db"
});

module.exports = connection;