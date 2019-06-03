const request = require('supertest')
const app = require('../src/app')
const HTTP = require('../src/utils/httpCodes')

test('Should create a new user', async () => {
  await request(app)
    .post('/api/users')
    .send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'mypassword!!!'
    })
    .expect(HTTP.CREATED)
})