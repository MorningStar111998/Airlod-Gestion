//Ici on crée la connection à la base de données. On limote

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



module.exports = pool;






