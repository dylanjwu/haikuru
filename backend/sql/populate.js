const { getConnection, query } = require('./connection.js')
const fs = require('fs');
const { connect } = require('http2');

const populateUsers = (sourceFile = './test/users.csv') => {
    const conn = getConnection();

    const f = fs.readFileSync().toString('utf-8');
    let rawRows = f.split('\r\n').slice(1).map(row => row.split(',')).slice();
    // console.log(rows.last)
    rawRows = rawRows.map(row => '(' + row.map(a => `'${a}'`).join(', ') + ')');
    const rows = rawRows.slice(0, rawRows.length - 1);
    const rowsString = rows.join(', ');


    const s = `INSERT INTO users (email, last_name, username, first_name, password)
    VALUES ${rowsString}
;`;

    query(conn, s).then(() => conn.end());
}

const populateHaikus = async(sourceFile = './test/haikus.txt') => {
        const conn = getConnection();

        const f = fs.readFileSync(sourceFile, 'utf-8');
        const lines = f.split('\n')
        const haikus = []
        let currHaiku = [];
        lines.forEach(line => {
            if (line === '' && currHaiku) {
                haikus.push(currHaiku);
                currHaiku = []
            } else {
                currHaiku.push(line);
            }
        })

        const count = await query(conn, 'SELECT COUNT(*) from users;');
        const numUsers = parseInt(count[0].count);
        console.log(numUsers);

        const entries = haikus.filter(h => !(h.join('').includes("'") || h.join('').includes('"'))).map((haiku) => [`'[${haiku.map(h => `"${h}"`).join(', ')}]'::jsonb`, Math.floor(Math.random() * (numUsers - 1))]);

        const entryStrings = entries.map(entry => `(${entry.join(', ')})`);
        const queryString = `INSERT INTO haikus (haiku_text, author) VALUES ${entryStrings.slice(0, entryStrings.length-1).join(', ')};`
        console.log(queryString)

        query(conn, queryString).then(() => conn.end());
}

populateHaikus();