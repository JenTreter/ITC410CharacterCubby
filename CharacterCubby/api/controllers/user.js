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
					.send()
			} else {
				res.enforcer.status(409).send()
			}
		},

		async updateUser (req, res) {
			const data = req.enforcer.body
			const { username } = req.enforcer.params

			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let user = await users.getUserByUsername(client, username)
				if (user === undefined) {
					res.enforcer.status(404).send()
				} else if (user.user_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await users.updateUser(client, req.user.id, data)
					res.enforcer.status(200).send()
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
			const { username } = req.enforcer.params
			try {
				await client.query('BEGIN')
				let user = await users.getUserByUsername(client, username)
				if (user === undefined) {
					res.enforcer.status(204).send()
				} else if (user.user_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await users.deleteUser(pool, user.id)
					res.enforcer.status(200).send()
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
			const { username } = req.enforcer.params
			try {
				await client.query('BEGIN')
				let user = await users.getUserByUsername(client, username)
				if (user === undefined) {
					res.enforcer.status(404).send()
				} else if (user.user_id !== req.user.id) {
					res.enforcer.status(403).send()
				} else {
					await users.getUser(pool, user.id)
					res.enforcer.status(200).send()
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