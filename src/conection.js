const { createPool } = require('mysql2/promise')

require('dotenv/config')

let sql = createPool({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_pass,
    database: process.env.mysql_database,
    port: process.env.mysql_port,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = {
    sql
}