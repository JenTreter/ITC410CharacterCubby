const users = require('../database/user')

module.exports = function (pool) {
	return {
		async createUser (req, res) {
			const { username, email, password, pronouns, profilePicture, aboutMe  } = req.enforcer.body
			const user_id = await users.createUser(pool, username, email, password, pronouns, profilePicture, aboutMe)
			if (user_id) {
				res.set('location', '/api/users/' + user_id)
					.enforcer
					.status(201)
					.send({user_id, username, email, pronouns, profilePicture, aboutMe})
			} else {
				res.enforcer.status(409).send()
			}
		},

		async updateUser (req, res) {
			const data = req.enforcer.body
			const { user_id } = req.enforcer.params
			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let user = await users.getUser(client, user_id)
				if (user === undefined) {
					res.enforcer.status(404).send()
				//} else if (user.user_id !== req.user.id) {
				//	res.enforcer.status(403).send()
				} else {
					await users.updateUser(client, user.user_id, data)
					res.enforcer.status(200).send({username:user.username, email:user.email, pronouns:user.pronouns, profilePicture:user.profilePicture, aboutMe:user.aboutMe})
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

		async deleteUser (req, res) {
			const { user_id } = req.enforcer.params
			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let user = await users.getUser(client, user_id)
				if (user === undefined) {
					res.enforcer.status(204).send()
				//} else if (user.user_id !== req.user.id) {
				//	res.enforcer.status(403).send()
				} else {
					await users.deleteUser(pool, user.user_id)
					res.enforcer.status(204).send()
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

		async getUser (req, res) {
			let { username } = req.enforcer.params
			const client = await pool.connect()
			if (username == undefined){
				username = req.user.username
			}
			try {
				await client.query('BEGIN')
				let user = await users.getUserByUsername(client, username)
				if (user === undefined) {
					res.enforcer.status(404).send()
				} else if (user.user_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await users.getUser(pool, user.id)
					res.enforcer.status(200).send({username:user.username, email:user.email, pronouns:user.pronouns, profilePicture:user.profilePicture, aboutMe:user.aboutMe})
				}
				await client.query('COMMIT')
			} catch (e) {
				await client.query('ROLLBACK')
				throw e
			} finally {
				client.release()
			}
		},

	}
}