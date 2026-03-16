const { Pool } = require('pg');

const pool = new Pool({
    user: 'niconico',
    host: 'localhost',
    database: 'E3_M7_db',
    password: 'Javascript',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000
});

module.exports = pool;