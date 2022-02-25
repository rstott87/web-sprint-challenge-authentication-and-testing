// Write your tests here
const request = require('supertest'); // calling it "request" is a common practice
const server = require('./server.js'); // this is our first red, file doesn't exist yet





    describe('POST /register', function() {
      test('[POST] /register', async () => {
        let result = await request(server)
            .post('/api/auth/register')
            .send({ username: 'Bob',
            password: '1234'})
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(result.status).toBe(201);
      })
      test('[POST] /register', async () => {
        let result = await request(server)
            .post('/api/auth/register')
            .send( 6 )
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(result.status).toBe(500);
      })
    })  


    describe('POST /login', function() {
      test('[POST] /login', async () => {
        let result = await request(server)
        .expect(result.status).toBe(201);
      })
      test('[POST] /login', async () => {
        let result = await request(server)
        .send({ username: 'Bob',
        password: '1234'})
        .expect(result.status).toBe(201);
      })
    })  

    describe('Get /jokes', function() {
      test('[GEt] /jokes', async () => {
        let result = await request(server)
        .get('/api/jokes')
        .expect(result.status).toBe(201);
      })
      it('responds with json', function(done) {
        request(server)
          .get('/api/jokes')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      
    })  

