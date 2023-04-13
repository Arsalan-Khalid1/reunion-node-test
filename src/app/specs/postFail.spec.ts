import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before } from 'mocha';
import { app } from '../../..';
import Post from '../models/post.model';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Post creation unsuccessfull', () => {
  let authToken = '';
  
  // Authenticate user and get auth token
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
        console.log("token => ", authToken)
        done();
      })
  });



  it('should not create a new post when title is missing', async () => {
    // Get initial number of posts
    const res1 = await chai.request(app)
      .get('/api/posts')
      .set('Cookie', `token=${authToken}`);
    const initialPostCount = res1.body.data.length;

    // Send POST request with title missing
    const res2 = await chai.request(app)
      .post('/api/posts')
      .set('Cookie', `token=${authToken}`)
      .send({ content: 'Test post description' });

    // Check response status and message
    expect(res2).to.have.status(400);
    expect(res2.body).to.have.property('success', false);

    // Get number of posts after POST request
    const res3 = await chai.request(app)
      .get('/api/posts')
      .set('Cookie', `token=${authToken}`);
    const postCountAfterRequest = res3.body.data.length;

    // Check if number of posts is the same as initial count
    console.log(postCountAfterRequest, initialPostCount)
    expect(postCountAfterRequest).to.equal(initialPostCount);
  }).timeout(5000);
});
