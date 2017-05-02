import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import testData from './testData';

const { admin, regularUser, roleOne } = testData;
let regularToken, adminToken;

const expect = chai.expect;
chai.use(chaiHttp);
describe('Role', () => {
  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
        done();
      });
  });

  // GET /roles
  describe('/GET roles', () => {
    it('should return all roles', (done) => {
      chai.request(server)
        .get('/roles')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  // POST /roles
  describe('/POST role', () => {
    it('should allow an admin to create a new role', (done) => {
      chai.request(server)
      .post('/roles')
      .set({ 'x-access-token': adminToken })
      .send(roleOne)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'name', 'message']
        );
        expect(res.body.name).to.eql('editor');
        expect(res.body.message).to.eql('Role created');
        roleOne.roleId = res.body.id;
        done();
      });
    });

    it('should fail if role alreay exists', (done) => {
      chai.request(server)
      .post('/roles')
      .set({ 'x-access-token': adminToken })
      .send(roleOne)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.eql('name must be unique');
        done();
      });
    });

    it('should deny access if user is not admin', (done) => {
      chai.request(server)
      .post('/roles')
      .set({ 'x-access-token': regularToken })
      .send({ name: 'subscriber' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });
  });

  // GET /roles/:id
  describe('/GET/:id role', () => {
    it('should return a role given an id', (done) => {
      chai.request(server)
        .get('/roles/2')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.eql({
            id: 2,
            name: 'regular'
          });
          done();
        });
    });

    it('should send "Role not found" for invalid id', (done) => {
      chai.request(server)
      .get('/roles/250')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .get('/roles/3000000000')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'value "3000000000" is out of range for type integer'
        );
        done();
      });
    });
  });

  // PUT /users/:id
  describe('/PUT/:id user', () => {
    it('should allow an admin to edit a role', (done) => {
      chai.request(server)
      .put(`/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': adminToken })
      .send({ name: 'subscriber' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.name).to.eql('subscriber');
        done();
      });
    });

    it('should deny access if user is not an admin', (done) => {
      chai.request(server)
      .put(`/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': regularToken })
      .send({ name: 'observer' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });

    it('should not allow a user to use an existing role name',
    (done) => {
      chai.request(server)
      .put('/roles/2')
      .set({ 'x-access-token': adminToken })
      .send({ name: 'admin' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.errors[0].message).to.eql('name must be unique');
        done();
      });
    });

    it('should send "Role not found" for invalid id', (done) => {
      chai.request(server)
      .put('/roles/250')
      .set({ 'x-access-token': adminToken })
      .send({ name: 'team7' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .put('/roles/3000000000')
      .set({ 'x-access-token': adminToken })
      .send({ name: 'team7' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'value "3000000000" is out of range for type integer'
        );
        done();
      });
    });
  });

  // DELETE /roles/:id
  describe('/DELETE/:id role', () => {
    it('should allow admin to delete a role', (done) => {
      chai.request(server)
      .delete(`/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role deleted');
        done();
      });
    });

    it('should send "Role not found" for invalid id', (done) => {
      chai.request(server)
      .delete('/roles/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .delete('/roles/3000000000')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'value "3000000000" is out of range for type integer'
        );
        done();
      });
    });
  });
});
