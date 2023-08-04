/**************************************************************
 * Файл соединения с базой данных
 * @type {{new(*): BoundPool, prototype: BoundPool}}
 **************************************************************/
const Pool = require('pg').Pool
const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
)

module.exports = pool
//powershell -ExecutionPolicy Bypass node_modules\.bin\sequelize-auto -o "./models" -d inconnect -h localhost -u postgres -p 5432 -x postgres -e postgres --cm p