let PG = require("pg");
let config ={
    user: process.env.USER_DB,
    database: process.env.NAME_DB,
    password: process.env.PWD_DB,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    max: 10,
    idleTimeoutMillis:30000
}; 

let pool = new PG.Pool(config);
module.exports =pool;