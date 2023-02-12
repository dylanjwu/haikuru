const express = require('express')
const { getConnection, query } = require('./sql/connection.js')
const cors = require('cors');
const app = express();
const port = 3001

const conn = getConnection();

app.use(cors());

app.get('/', async(req, res) => {
    const rows = await query(conn, "SELECT haiku_text as text, username, email FROM haikus h JOIN users u ON (h.author = u.id);")
    res.send(rows)
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})