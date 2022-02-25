// Write your tests here
const request = require('supertest'); // calling it "request" is a common practice
const server = require('./server.js'); // this is our first red, file doesn't exist yet


test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
 
    describe('POST /user', function() {
      test('[POST] /users', async () => {
        let result = await request(server)
            .post('/api/auth/register')
            .send({ username: 'Smaug',
            password: '1234'})
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(result.status).toBe(201);
      })
    })  
})  
