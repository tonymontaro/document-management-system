import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import testData from './testData';
import authenticator from '../middlewares/authenticator';

const { admin, regularUser, roleOne, invalidToken } = testData;
let regularToken, adminToken;

const expect = chai.expect;
chai.use(chaiHttp);
describe('Authenticator:', () => {
  // GenerateToken
  describe('GenerateToken', () => {
    it("should generate a token given user's id and roleId", () => {
      const token = authenticator.generateToken({
        id: 1,
        roleId: 1
      });
      expect(token).to.not.be.undefined;
      expect(token).to.be.a('string');
      expect(token.length).to.be.greaterThan(1);
    });
  });

  describe('VerifyUser', () => {
    before((done) => {
      chai.request(server)
        .post('/users/login')
        .send(regularUser)
        .end((err, res) => {
          regularToken = res.body.token;
          done();
        });
    });

    it('should verify and grant a user access when provided with a valid token',
    (done) => {
      chai.request(server)
      .get('/users/2')
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.eql({
          id: 2,
          username: 'montaro',
          fullName: 'Tony Montaro',
          email: 'bossmontaro@gmail.com',
          roleId: 2
        });
        done();
      });
    });

    it('should deny access when provided with an invalid token',
    (done) => {
      chai.request(server)
      .get('/users/2')
      .set({ 'x-access-token': invalidToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Authentication failed');
        done();
      });
    });
  });

  describe('VerifyUser', () => {
    before((done) => {
      chai.request(server)
        .post('/users/login')
        .send(regularUser)
        .end((err, res) => {
          regularToken = res.body.token;
          done();
        });
    });

    it('should send an error when an input type other than integer is provided',
    (done) => {
      chai.request(server)
      .put('/users/myid')
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'invalid input syntax for integer: "myid"'
        );
        done();
      });
    });
  });

  describe('VerifyToken', () => {
    it("should generate a token given user's id and roleId", () => {
      const token = authenticator.generateToken({
        id: 1,
        roleId: 1
      });
      let decoded;
      try {
        decoded = jwt.verify(token, 'wrong-secret');
      } catch (err) {
        decoded = undefined;
      }
      expect(authenticator.verifyToken(token))
        .to.not.be.undefined;
      expect(decoded).to.equal(undefined);
    });
  });
});
