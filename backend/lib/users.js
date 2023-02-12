const deleteUserSQL = (userId) => `DELETE FROM users WHERE id = ${userId}`
const createUserSQL = ({
    email,
    lastname,
    username,
    firstname,
    password,
    lastLoggedIn,
}) => `INSERT INTO users VALUES (email, last_name, username, first_name, password, last_logged_in)
    values (${email}, ${lastname}, ${username}, ${firstname}, ${password}, ${lastLoggedIn});
`
const getFollowerIdsForUserSQL = (userId) => `SELECT ff.follower_id as id FROM users u JOIN follower_followed ff where (u.id = ff.followed_id) WHERE u.id = ${userId}`;
const getFollowedIdsForUserSQL = (userId) => `SELECT ff.followed_id as id FROM users u JOIN follower_followed ff where (u.id = ff.follower_id) WHERE u.id = ${userId}`;