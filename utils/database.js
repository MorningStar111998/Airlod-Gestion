
//real
const dotenv = require("dotenv");
dotenv.config();

const { createPool } = require("mysql");

const pool = createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// //**********************TEST */

// const pool = createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "airlod_livraison_test",
//   port: 3325,
// });


module.exports = pool;






