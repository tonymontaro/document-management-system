import chai from 'chai';
import models from '../../models/';
import testData from '../testData';

const { userOne } = testData;
let updateUserId;
const expect = chai.expect;

describe('User Model', () => {
  describe('Create User', () => {
    it('should create a user', (done) => {
      models.User.create(userOne)
        .then((user) => {
          expect(user.dataValues.title).to.equal(userOne.title);
          updateUserId = user.dataValues.id;
          done();
        });
    });

    it('should fail if username already exist', (done) => {
      models.User.create(userOne)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Username already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if username was not provided', (done) => {
      userOne.username = '';
      models.User.create(userOne)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Username cannot be empty');
          done();
        });
    });

    it('should fail if username is invalid', (done) => {
      userOne.username = 'user   name';
      models.User.create(userOne)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Use a valid username');
          done();
        });
    });

    it('should fail if email already exist', (done) => {
      userOne.username = 'kakashi';
      models.User.create(userOne)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Email already exist');
        expect(error.errors[0].type).to.equal('unique violation');
        done();
      });
    });

    it('should fail if email is invalid', (done) => {
      userOne.username = 'kakashi';
      userOne.email = 'random@gamil';
      models.User.create(userOne)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Use a valid email');
        done();
      });
    });


    it('should fail if password is null', (done) => {
      userOne.username = 'kakashi';
      userOne.email = 'random@gamil.com';
      userOne.password = null;
      models.User.create(userOne)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('password cannot be null');
        done();
      });
    });
  });

  describe('Update User', () => {
    it('should update a user', (done) => {
      models.User.findById(updateUserId)
        .then((user) => {
          user.update({ username: 'Socrates' })
            .then((updatedUser) => {
              expect(updatedUser.dataValues.id).to.equal(updateUserId);
              expect(user.dataValues.username).to.equal('Socrates');
              done();
            });
        });
    });
  });

  describe('Delete User', () => {
    it('should delete a user', (done) => {
      models.User.destroy({ where: { id: updateUserId } })
        .then(() => {
          models.User.findById(updateUserId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
