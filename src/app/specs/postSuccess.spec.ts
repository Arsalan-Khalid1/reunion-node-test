import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import { app } from '../../..';

chai.use(chaiHttp);
const expect = chai.expect;


describe('Post creation', () => {
  
  // Authenticate user and get auth token
  let authToken = '';
    before(function(done) {
      this.timeout(5000)
      chai.request(app)
        .post('/api/authenticate/sign-in')
        .send({
          email: 'test2@test.com',
          password: '123123123!aA'
        }).end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          authToken = res.body.data;
          done();
        })
    })
  const random = Math.floor(Math.random() * 1000)
  it('should create a post with valid input', (done) => {
    chai.request(app)
      .post('/api/posts')
      .set('Cookie', `token=${authToken}`) 
      .send({
        title: 'Test Post ' + random,
        content: 'This is a test post.',
      }).end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data').to.have.property('title').equal('Test Post ' + random);
      expect(res.body).to.have.property('data').to.have.property('content').equal('This is a test post.');
      done(); 
    });
  }).timeout(5000);
});
