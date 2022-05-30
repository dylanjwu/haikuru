const { Client } = require('pg');
require('nodemon')
const express = require('express');
const { users } = require('./random_users')

const port = 3000
const app = express()

app.use(express.json())

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: '',
    database: 'dylanwu',
})


app.put('/create-user', (req, res) => {
    console.log(req.body)
        // res.send(req)
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
app.get('/get-haikus', (req, res) => {})
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

const newUser = (req, res) => {

}

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