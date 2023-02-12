const { rejects } = require('assert');
const { Client } = require('pg')

const client = new Client({
    host: 'my-db-instance.cq0mezfgdqbr.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'dylan',
    password: 'dylan123',
    database: 'my_db',
});

const getConnection = () => {
    client.connect((err) => {
        if (err) console.log(err);
        else console.log("Database connection established")
    });
    return client;
}


const query = (conn, sqlQuery) => {
    return new Promise((resolve, reject) => {
        conn.query(sqlQuery, (err, res) => {
            if (err) {
                reject(err);
            }
            if (res) resolve(res.rows);
            else resolve('success')
        });
    });
}

module.exports = {
    getConnection,
    query
}