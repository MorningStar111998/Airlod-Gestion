// 
//real
const dotenv = require("dotenv");
dotenv.config();

const { createConnection } = require("mysql");

const mysql = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

mysql.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }

  console.log("Connected to MySQL database as id " + mysql.threadId);
});

module.exports = mysql;

const { createConnection } = require("mysql");

// const mysql = createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "airlod_livraison_test",
//   port: 3325, 
// });

// mysql.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL database: " + err.stack);
//     return;
//   }

//   console.log("Connected to MySQL database as id " + mysql.threadId);
  
// });

// module.exports = mysql;

