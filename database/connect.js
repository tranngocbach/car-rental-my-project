var mysql = require("mysql");
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'customer',
    password: 'password1234',
    database: 'car'
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});
module.exports = conn;