import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('test', () => {
  it('home', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('post to todo', (done) => {
    chai.request(server)
      .post('/roles')
      .send({ name: 'admin' })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
