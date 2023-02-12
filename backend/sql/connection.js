const { rejects } = require('assert');
const { Client } = require('pg')

const client = new Client({
    host: '',
    port: ,
    user: '',
    password: '',
    database: '',
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
