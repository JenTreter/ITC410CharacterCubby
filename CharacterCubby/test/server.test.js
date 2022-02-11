const expect = require('chai').expect
const app = require('../api/server')
const request = require('supertest')

describe('server', () => {

	describe('users', () => {
		it('can create a user', () => {
			// The supertest request function returns a promise.
			// Remember that one way to run asynchronous tests
			// is to return a promise.
			return request(app)
				.post('/api/users')
				.send({
                    username: 'JellyCat',
                    email: 'JellyCats89@gmail.com',
                    password: 'jumpingjellybeans8!',
                    pronouns: 'She/Her',
                    profilePicture: 'c3RyaW5n',
                    aboutMe: 'smol bean who likes cats'
				})
				.expect(201)
		})

		it('can delete a user', () => {
			return request(app)
				.delete('/api/users/user-id')
				.send()
				.expect(204)
		})

		it('can login', () => {
			return request(app)
				.put('/api/users/user-id/login')
				.send({ password: 'jumpingjellybeans8!' })
				.expect(200)
		})

		it('can logout', () => {
			return request(app)
				.put('/api/users/user-id/logout')
				.send()
				.expect(200)
		})
	})

	describe('templates', () => {
		it('can get templates', () => {
			return request(app)
				.get('/api/templates/237e9877-e79b-12d4-a765-321741963000/583e5a7b-48bc-913f-0dd4-463559268361')
				.send()
				.expect(200)
				.then(res => {
					expect(res.body).to.be.an('object')
				})
		})

		it('cannot create a template', () => {
			return request(app)
				.post('/api/templates')
				.send({
					userId: '237e9877-e79b-12d4-a765-321741963000',
                    templateId: '583e5a7b-48bc-913f-0dd4-463559268361',
					name: 'Monarch',
					permissions: 'Public',
				})
				.expect(400)
		})

        it('can create a template', () => {
			return request(app)
				.post('/api/templates')
				.send({
                    templateId: '583e5a7b-48bc-913f-0dd4-463559268361',
					name: 'Monarch',
					permissions: 'Public',
                    information: [],
                    thumbnail: 'c3RyaW5n' 
				})
                // .then(response => {
                //     console.log(response.body)
                //     console.log(response.status)
                // })
				.expect(201)
		})

        it('cannot delete a template', () => {
			return request(app)
				.delete('/api/delete/templates')
				.send()
				.expect(404)
		})

        it('cannot delete a template', () => {
			return request(app)
				.post('/api/templates/template-id/user-id')
				.send()
				.expect(405)
		})
	})
})