const request = require('supertest')
const app = require('../src/app')
const HTTP = require('../src/utils/httpCodes')
const testUser = require('./test-user')
const User = require('../src/models/user')

beforeAll(async () => {
  await User.deleteMany({})
})

test('Should create a new user', async () => {
  await request(app)
    .post('/api/users')
    .send(testUser)
    .expect(HTTP.CREATED)
})

test('Should login existing user', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      email: testUser.email,
      password: testUser.password
    })
    .expect(HTTP.OK)
})

test('Should NOT login with wrong credentials', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      email: 'wrong@email.com',
      password: testUser.password
    })
    .expect(HTTP.BAD_REQUEST)
})

test('Should fetch own profile', async () => {
  await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .expect(HTTP.OK)
})

test('Should NOT allow unauthorized access to profile', async () => {
  await request(app)
    .get('/api/users/me')
    .expect(HTTP.UNAUTHORIZED)
})

test('Should delete own profile', async () => {
  await request(app)
    .delete('/api/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .expect(HTTP.OK)
})

test('Should NOT allow unauthorized deletion of profile', async () => {
  await request(app)
    .delete('/api/users/me')
    .expect(HTTP.UNAUTHORIZED)
})