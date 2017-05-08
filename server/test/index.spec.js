import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Index route', () => {
  it('should respond with a message', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Document Manangement System API');
        done();
      });
  });
});
