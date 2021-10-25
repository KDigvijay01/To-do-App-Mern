const mysql=require('mysql');

const connection =mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Mysql@123',
    database:'todolist'
})

connection.connect()

module.exports = connection;
