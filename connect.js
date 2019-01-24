const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const pool = new pg.Pool({
 connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
 console.log('connected to the Database');
});

module.exports = pool