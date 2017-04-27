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
        console.log(res.body);
        res.should.have.status(200);
        done();
      });
  });
});
