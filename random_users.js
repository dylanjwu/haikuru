const fs = require('fs');

let names_map = new Map();
names_map.set('last_names.txt', [])
names_map.set('first_names.txt', [])


const getNames = (name) => {
    try {
        const data = fs.readFileSync(name, 'utf8');
        names_map.set(name, data.split('\n'))
    } catch (err) {
        console.error(err)
    }
}

getNames('last_names.txt')
getNames('first_names.txt')


const randomName = (first_names, last_names) => {

    const rand_first_i = Math.floor((Math.random() * first_names.length - 1))
    const rand_last_i = Math.floor((Math.random() * last_names.length - 1))

    return [first_names[rand_first_i], last_names[rand_last_i]]
}

const randIntRange = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low)
}

const randUsers = () => {
    let users = []

    for (i = 0; i < 50; i++) {
        const fullName = randomName(names_map.get('first_names.txt'), names_map.get('last_names.txt')).join("")

        const randMonth = randIntRange(1, 12)
        const randYear = (new Date().getFullYear() - 100) + randIntRange(1, 100)
        const randDate = Math.floor(1, 28)
        const emailDomains = ['@gmail.com', '@outlook.com']
        const randDomainIndex = randIntRange(0, emailDomains.length - 1)

        const user = {
            userName: fullName,
            email: fullName.concat(emailDomains[randDomainIndex]),
            joined: `${randMonth}-${randDate}-${randYear}`
        }
        users.push(user)

    }
    return users
}

module.exports = { users: randUsers() }