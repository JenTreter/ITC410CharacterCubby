const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createUser = async function (client, username, email, password, pronouns, profilePicture, aboutMe) {
    const user_id = uuid()
    const { rowCount } = await client.query({
        name: 'create-user',
        text: 'INSERT INTO users (user_id, username, email, password, pronouns, profilePicture, aboutMe) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING',
        values: [
            user_id,
            username,
            email,
            await encryptPassword(password),
            pronouns,
            profilePicture,
            aboutMe
        ]
    })
    return rowCount > 0 ? user_id : undefined
}

exports.getUser = async function (client, user_id) {
    const { rows } = await client.query({
        name: 'get-user-by-id',
        text: 'SELECT * FROM users WHERE user_id=$1',
        values: [user_id]
    })
    return rows[0]
}

exports.getUserByUsername = async function (client, username) {
    const { rows } = await client.query({
        name: 'get-user-by-username',
        text: 'SELECT * FROM users WHERE username=$1',
        values: [username]
    })
    return rows[0]
}

exports.updateUser = async  function (client, user_id, data) {
    // create dynamic query based on inputs
    const { username, email, password, pronouns, profilePicture, aboutMe } = data
    const values = []
    const sets = []

    if (username !== undefined) {
        values.push(username)
        sets.push('username=$' + values.length)
    }

    if (email !== undefined) {
        values.push(email)
        sets.push('email=$' + values.length)
    }

    if (password !== undefined) {
        values.push(await encryptPassword(password))
        sets.push('password=$' + values.length)
    }

    if (pronouns !== undefined) {
        values.push(pronouns)
        sets.push('pronouns=$' + values.length)
    }

    if (profilePicture !== undefined) {
        values.push(profilePicture)
        sets.push('profilePicture=$' + values.length)
    }

    if (aboutMe !== undefined) {
        values.push(aboutMe)
        sets.push('aboutMe=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getUser(client, user_id)

    values.push(user_id)
    const { rows } = await client.query({
        name: 'update-user',
        text: 'UPDATE users SET ' + sets.join(', ') + ' WHERE user_id=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteUser = async function (client, user_id) {
    const { rowCount } = await client.query({
        name: 'delete-user',
        text: 'DELETE FROM users WHERE user_id=$1',
        values: [user_id]
    })
    return rowCount > 0
}

async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}