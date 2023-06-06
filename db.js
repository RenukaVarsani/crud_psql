const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: process.env.user,
    password: process.env.password,
    database: "demo"
});

module.exports = pool; 