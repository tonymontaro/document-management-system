import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import db from '../models';

const expect = chai.expect;
chai.use(chaiHttp);
describe('Role', () => {
  beforeEach((done) => {
    db.Role.destroy({
      where: {
        name: { $notIn: ['admin', 'regular'] }
      }
    })
    .then(() => done());
  });

  describe('Create Role', () => {
    it('should be able to create a role', (done) => {
      chai.request(server)
        .post('/roles')
        .send({ name: 'classes' })
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['id', 'name', 'message']);
          expect((res.body.message)).to.eq('Role created');
          done();
        });
    });
  });
});
