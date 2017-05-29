import chai from 'chai';
import httpMocks from 'node-mocks-http';
import events from 'events';
import chaiHttp from 'chai-http';
import server from '../../app';
import testData from '../testData';
import Authenticator from '../../helpers/Authenticator';

const { regularUser } = testData;
let regularToken;

const expect = chai.expect;
const responseEvent = () => httpMocks
.createResponse({ eventEmitter: events.EventEmitter });
chai.use(chaiHttp);

describe('Authenticator', () => {
  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
        done();
      });
  });


  describe('VerifyUser', () => {
    it('should grant access if token is valid', (done) => {
      const response = responseEvent();
      response.locals = {};
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': regularToken }
      });

      const callback = () => {
        expect(response.locals.decoded.id).to.equal(2);
        expect(response.locals.decoded.username).to.equal('montaro');
        done();
      };
      Authenticator.verifyUser(request, response, callback);
    });


    it('should deny access if no token was provided', (done) => {
      const response = responseEvent();
      response.locals = {};
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });

      const callback = () => {};
      Authenticator.verifyUser(request, response, callback);

      expect(response._getData().message).to.equal('No token provided');
      done();
    });


    it('should deny access if token is invalid', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': 'invalidrandomword' }
      });

      const callback = () => {};
      Authenticator.verifyUser(request, response, callback);

      response.on('end', () => {
        expect(response._getData().message).to.equal('Authentication failed');
        done();
      });
    });
  });

  describe('VerifyAdmin', () => {
    it('should grant access to an admin', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 1 } };
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });

      const callback = () => {
        expect(response.locals.decoded.roleId).to.equal(1);
        done();
      };
      Authenticator.permitAdmin(request, response, callback);
    });


    it('should deny access if the user is not an admin', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 2 } };
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });

      const callback = () => {};
      Authenticator.permitAdmin(request, response, callback);

      expect(response._getData().message).to.equal('Access denied');
      done();
    });
  });


  describe('PermitOwnerOrAdmin', () => {
    it('should grant access to an admin', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 1 } };
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        params: { id: 2 }
      });

      const callback = () => {
        expect(response.locals.decoded.roleId).to.equal(1);
        done();
      };
      Authenticator.permitOwnerOrAdmin(request, response, callback);
    });

    it('should grant access to the profile owner', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 2, id: 2 } };
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        params: { id: 2 }
      });

      const callback = () => {
        expect(response.locals.decoded.id).to.equal(2);
        done();
      };
      Authenticator.permitOwnerOrAdmin(request, response, callback);
    });

    it('should deny access if the user is not an admin or profile owner', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 2 } };
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        params: { id: 2 }
      });

      const callback = () => {};
      Authenticator.permitOwnerOrAdmin(request, response, callback);

      response.on('end', () => {
        expect(response._getData().message).to.equal('Access denied');
        done();
      });
    });
  });

  describe('PermitAuthor', () => {
    it('should grant access to the author', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 2, id: 2 } };
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/documents',
        params: { id: 2 }
      });

      const callback = () => {
        expect(response.locals.decoded.id).to.equal(2);
        done();
      };
      Authenticator.permitAuthor(request, response, callback);
    });

    it('should deny access if the user is not the document author', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 1, id: 1 } };
      const request = httpMocks.createRequest({
        method: 'DELETE',
        url: '/documents',
        params: { id: 2 }
      });

      const callback = () => {};
      Authenticator.permitAuthor(request, response, callback);

      response.on('end', () => {
        expect(response._getData().message).to.equal('Access denied');
        done();
      });
    });
  });
});
