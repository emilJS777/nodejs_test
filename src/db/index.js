const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    username: 'puser',
    password: '<password>',
    port: 5432,
    database: 'nodeDB',
})

module.exports = pool;