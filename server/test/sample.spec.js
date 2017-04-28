import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.should();
chai.use(chaiHttp);

describe('test', () => {
  it('home', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('post to todo', (done) => {
    chai.request(server)
      .post('/todo')
      .send({ title: 'tony' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(201);
        done();
      });
  });
});
