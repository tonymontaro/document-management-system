import chai from 'chai';
import models from '../../models/';
import testData from '../testData';

const { roleOne } = testData;
let updateRoleId;
const expect = chai.expect;

describe('Role Model', () => {
  describe('Create Role', () => {
    it('should create a role', (done) => {
      models.Role.create(roleOne)
        .then((role) => {
          expect(role.dataValues.name).to.equal(roleOne.name);
          updateRoleId = role.dataValues.id;
          done();
        });
    });

    it('should fail when role name already exist', (done) => {
      models.Role.create({ name: 'editor' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Role already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if name was not provided', (done) => {
      models.Role.create({ name: '' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Name cannot be empty');
          done();
        });
    });

    it('should fail when the name of a role is null', (done) => {
      models.Role.create({ name: null })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('name cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
  });

  describe('Update Role', () => {
    it('should update a role', (done) => {
      models.Role.findById(updateRoleId)
        .then((role) => {
          role.update({ name: 'subscriber' })
            .then((updatedRole) => {
              expect(updatedRole.dataValues.id).to.equal(updateRoleId);
              expect(role.dataValues.name).to.equal('subscriber');
              done();
            });
        });
    });
  });

  describe('Delete role', () => {
    it('should delete a role', (done) => {
      models.Role.destroy({ where: { id: updateRoleId } })
        .then(() => {
          models.Role.findById(updateRoleId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
