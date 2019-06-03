const request = require('supertest')
const app = require('../src/app')
const HTTP = require('../src/utils/httpCodes')
const testUser = require('./test-user')
const User = require('../src/models/user')

beforeAll(async () => {
  await User.deleteMany({})
})

test('should create a new user', async () => {
  const { body } = await request(app)
    .post('/api/users')
    .send(testUser)
    .expect(HTTP.CREATED)

  const user = await User.findById(body.user._id)

  expect(user).not.toBeNull()
  expect(body).toMatchObject({
    user: {
      _id: user._id.toString(),
      name: user.name,
      email: user.email
    },
    token: body.token
  })
})

test('should login existing user', async () => {
  const { body } = await request(app)
    .post('/api/users/login')
    .send({
      email: testUser.email,
      password: testUser.password
    })
    .expect(HTTP.OK)

  const user = await User.findById(body.user._id)

  expect(user).not.toBeNull()
  expect(body.token).toBe(user.tokens[1].token)
})

test('should NOT login with wrong credentials', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      email: 'wrong@email.com',
      password: testUser.password
    })
    .expect(HTTP.BAD_REQUEST)
})

test('should fetch own profile', async () => {
  await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .expect(HTTP.OK)
})

test('should NOT allow unauthorized access to profile', async () => {
  await request(app)
    .get('/api/users/me')
    .expect(HTTP.UNAUTHORIZED)
})

test('should NOT allow unauthorized deletion of profile', async () => {
  await request(app)
    .delete('/api/users/me')
    .expect(HTTP.UNAUTHORIZED)
})

test('should upload profile picture', async () => {
  await request(app)
    .post('/api/users/me/picture')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .attach('file', 'tests/fixtures/test-image.png')
    .expect(HTTP.OK)

  const user = await User.findOne({ _id: testUser._id })

  expect(user.picture).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
  await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .send({
      name: 'Modified User Name',
      email: 'modified@email.com'
    })
    .expect(HTTP.OK)

  const user = await User.findOne(testUser._id)

  expect(user).not.toBeNull()
  expect(user).toMatchObject({
    _id: testUser._id,
    name: 'Modified User Name',
    email: 'modified@email.com'
  })
})

test('should NOT update unauthorized user', async () => {
  await request(app)
    .patch('/api/users/me')
    .expect(HTTP.UNAUTHORIZED)
})

test('should delete own profile', async () => {
  await request(app)
    .delete('/api/users/me')
    .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
    .expect(HTTP.OK)

  const user = await User.findOne({ _id: testUser._id })

  expect(user).toBeNull()
})