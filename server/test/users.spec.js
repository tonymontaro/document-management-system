import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import testData from './testData';

const {
  userOne, userTwo, invalidUserDetails, admin, regularUser, userThree
 } = testData;
let regularToken, adminToken;

const expect = chai.expect;
chai.use(chaiHttp);

describe('User', () => {
  // POST /users/login
  describe('/POST/login user', () => {
    it('can login a user and return a token', (done) => {
      chai.request(server)
      .post('/users/login')
      .send(admin)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys(['token', 'message']);
        expect(res.body.message).to.eql('Login successful');
        done();
      });
    });

    it('should fail for invalid user credentials', (done) => {
      chai.request(server)
      .post('/users/login')
      .send({ username: admin.username, password: 'montaro' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Wrong password or username');
        done();
      });
    });
  });

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

  // POST /users
  describe('/POST user', () => {
    it('can create a new user', (done) => {
      chai.request(server)
      .post('/users')
      .send(userOne)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'username', 'fullName', 'roleId', 'message', 'token', 'email']
        );
        expect(res.body.message).to.eql('User created');
        userOne.userId = res.body.id;
        done();
      });
    });

    it('should fail if username already exists', (done) => {
      chai.request(server)
      .post('/users')
      .send(userOne)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.eql('username must be unique');
        done();
      });
    });

    it('should fail if email alreay exists', (done) => {
      userTwo.email = userOne.email;
      chai.request(server)
      .post('/users')
      .send(userTwo)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.eql('email must be unique');
        done();
      });
    });

    it('should not allow the creation of a user with admin role', (done) => {
      userTwo.roleId = '1';
      chai.request(server)
      .post('/users')
      .send(userTwo)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.eql('Invalid roleId');
        done();
      });
    });

    it('should return a token after creating a user', (done) => {
      chai.request(server)
      .post('/users')
      .send(userThree)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.token).to.not.be.undefined;
        expect(res.body.message).to.eql('User created');
        userThree.userId = res.body.id;
        done();
      });
    });

    it('should fail for invalid user details', (done) => {
      chai.request(server)
      .post('/users')
      .send(invalidUserDetails)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.eql('Validation isEmail failed');
        done();
      });
    });
  });

  // GET /users
  describe('/GET users', () => {
    it('should return all users', (done) => {
      chai.request(server)
        .get('/users')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.greaterThan(2);
          done();
        });
    });

    it('should deny access if user is not admin', (done) => {
      chai.request(server)
      .get('/users')
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });

    it('should deny access if no token was provided', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('No token provided');
        done();
      });
    });

    it('should return correct user(s) for a query', (done) => {
      chai.request(server)
        .get('/users?q=admin')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].username).to.eql('admin');
          done();
        });
    });

    it('can limit the number of users returned', (done) => {
      chai.request(server)
        .get('/users?limit=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(2);
          expect(res.body[0].id).to.eql(1);
          done();
        });
    });

    it('can offset the starting position of returned', (done) => {
      chai.request(server)
        .get('/users?offset=1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].id).to.eql(2);
          done();
        });
    });
  });

  // GET /users/:id
  describe('/GET/:id user', () => {
    it('should return a particular user given an id', (done) => {
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

    it('should deny access if no token was provided', (done) => {
      chai.request(server)
      .get('/users/2')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('No token provided');
        done();
      });
    });

    it('should send "User not found" for invalid id', (done) => {
      chai.request(server)
      .get('/users/250')
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .get('/users/3000000000')
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

  // PUT /users/:id
  describe('/PUT/:id user', () => {
    it('should allow a user to update his/her details', (done) => {
      chai.request(server)
      .put('/users/2')
      .set({ 'x-access-token': regularToken })
      .send({ fullName: 'John Snow' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.eql({
          id: 2,
          username: 'montaro',
          fullName: 'John Snow',
          email: 'bossmontaro@gmail.com',
          roleId: 2
        });
        done();
      });
    });

    it("should allow admin to update a user's details", (done) => {
      chai.request(server)
      .put('/users/2')
      .set({ 'x-access-token': adminToken })
      .send({ fullName: 'Tony Montaro' })
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

    it('should not allow a user to use an existing email',
    (done) => {
      chai.request(server)
      .put('/users/2')
      .set({ 'x-access-token': regularToken })
      .send({ email: userOne.email })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.errors[0].message).to.eql('email must be unique');
        done();
      });
    });

    it('should not allow a user to upgrade his/her role to admin', (done) => {
      chai.request(server)
      .put('/users/2')
      .set({ 'x-access-token': regularToken })
      .send({ roleId: '1' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'Only an admin can upgrade a user to an admin role'
        );
        done();
      });
    });

    it("should deny access if a user tries to update another user's profile",
    (done) => {
      chai.request(server)
      .put(`/users/${userOne.userId}`)
      .set({ 'x-access-token': regularToken })
      .send({ fullName: 'Al Capone' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });
  });

  // POST /users/logout
  describe('/POST/logout user', () => {
    it('can logout a user', (done) => {
      chai.request(server)
      .post('/users/logout')
      .send(admin)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message)
          .to.eql('Success, delete user token on the client');
        done();
      });
    });
  });

  // DELETE /users/:id
  describe('/DELETE/:id user', () => {
    let userThreeToken;
    before((done) => {
      chai.request(server)
        .post('/users/login')
        .send(userThree)
        .end((err, res) => {
          userThreeToken = res.body.token;
          done();
        });
    });

    it("should deny access if a user tries to delete another user's profile",
    (done) => {
      chai.request(server)
      .delete(`/users/${userOne.userId}`)
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });

    it("should allow admin to delete a user's profile", (done) => {
      chai.request(server)
      .delete(`/users/${userOne.userId}`)
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User deleted');
        done();
      });
    });

    it('should allow a user to delete his/her profile', (done) => {
      chai.request(server)
      .delete(`/users/${userThree.userId}`)
      .set({ 'x-access-token': userThreeToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User deleted');
        done();
      });
    });

    it('should send "User not found" for invalid id', (done) => {
      chai.request(server)
      .delete('/users/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User not found');
        done();
      });
    });
  });

  // GET /users/:id/documents
  describe('/GET/:id/documents user', () => {
    it("should return a user's document(s) given the user's id", (done) => {
      chai.request(server)
        .get('/users/1/documents')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });

    it('should send "User not found" for invalid id', (done) => {
      chai.request(server)
      .get('/users/250/documents')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .get('/users/3000000000/documents')
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
