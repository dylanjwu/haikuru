const { Client } = require('pg');
const haikus = require('./read_haikus')
const cors = require('cors')
const nodemon = require('nodemon')
const express = require('express');
const { users } = require('./random_users');
const { nextTick } = require('process');
const { application } = require('express');

const port = 3000
const app = express()

app.use(express.json())
app.use(cors())

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: '',
    database: 'dylanwu',
})

client.connect()

app.put('/create-user', (req, res) => {
    console.log(req.body)
        // res.send(req)
})
app.put('/create-haiku', (req, res) => {
    let { text, likes, dislikes, user_id } = req.body;
    console.log(req.body)
    client.query(`INSERT INTO haikus(text, likes, dislikes, user_id) VALUES('${text}',${likes},${dislikes},${user_id})`)

    // client.query('SELECT * FROM haikus', (err, res) => { console.log(res.rows) });

    res.send("put request");
})

app.post('/delete-user', (req, res) => {
    res.send("put request")
})
app.post('/like-haiku', (req, res) => {})
app.post('/dislike-haiku', (req, res) => {})
app.post('/edit-haiku', (req, res) => {})
app.post('/delete-haiku', (req, res) => {})

app.get('/', (req, res) => {
    res.send("hello world!")
})
app.get('/validate-user', (req, res) => {})
app.get('/get-followers', (req, res) => {})
app.get('/get-following', (req, res) => {})
app.get('/get-haikus', (req, response) => {
    client.query('SELECT * FROM haikus', (err, res) => {
        if (!err) {
            response.send(res.rows)
        } else {
            next(err)
        }
    });
})
app.get('/get-feed', (req, res) => {})





app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

// client.connect()

const insertUser = ({ userName, email, joined }) => {
    console.log(`INSERT INTO users(username, email, joined) VALUES('${userName}', '${email}', '${joined}')`)
    client.query(`INSERT INTO users(username, email, joined) VALUES('${userName}', '${email}', '${joined}')`, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log("Query successful")
        }
    })
}


// console.log(users)
// users.forEach(user => insertUser(user))


const selectAllUsers = () => {
    client.query('SELECT * FROM users', (err, res) => {
        if (!err) {
            console.log(res.rows)
        } else {
            console.log(err.message)
        }
        client.end
    })
}


// const newUser = (req, res) => {

// }

/*
    API
        New user - sign up
        Current user - Sign in
        Edit bio 
        Delete user
        Draft haiku
        Post haiku
        Edit haiku
        Delete haiku
        Like/dislike Haiku
        Follow user
        Unfollow user (user you're following)




    Table: Users
        Id
        Username
        Password
        Email
        Followers id
        Following id
        Haikus id 

    Table: Haiku 
        Id
        Poster
        Content
        Likes
        Dislikes


*/