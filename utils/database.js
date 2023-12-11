const { createConnection } = require("mysql");

const mysql = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "airlod_livraison_test",
  port: 3325, 
});

mysql.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }

  console.log("Connected to MySQL database as id " + mysql.threadId);
  
});

module.exports = mysql;