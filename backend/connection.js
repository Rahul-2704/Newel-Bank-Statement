const Pool=require('pg').Pool

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'newel',
    password:'rahul_270204',
    port:5432,
});

module.exports=pool;