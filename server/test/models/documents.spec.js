import chai from 'chai';
import models from '../../models/';
import testData from '../testData';

const { simpleDocument } = testData;
let updateDocId;
const expect = chai.expect;

describe('Document Model', () => {
  describe('Create Document', () => {
    it('should create a document', (done) => {
      models.Document.create(simpleDocument)
        .then((document) => {
          expect(document.dataValues.title).to.equal(simpleDocument.title);
          expect(document.dataValues.content).to.equal(simpleDocument.content);
          updateDocId = document.dataValues.id;
          done();
        });
    });

    it('should fail if title already exist', (done) => {
      models.Document.create(simpleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if title was not provided', (done) => {
      simpleDocument.title = '';
      models.Document.create(simpleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title cannot be empty');
          done();
        });
    });

    it('should fail if content was not provided', (done) => {
      simpleDocument.title = 'sample title';
      simpleDocument.content = '';
      models.Document.create(simpleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Content cannot be empty');
          done();
        });
    });

    it('should fail if access is not public, private or role', (done) => {
      simpleDocument.content = 'sample content';
      simpleDocument.access = 'wrongRole';
      models.Document.create(simpleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Use a valid access type');
          done();
        });
    });
  });

  describe('Update Document', () => {
    it('should update a document', (done) => {
      models.Document.findById(updateDocId)
        .then((document) => {
          document.update({ title: 'Chessmen from mars' })
            .then((updatedDocument) => {
              expect(updatedDocument.dataValues.id).to.equal(updateDocId);
              expect(document.dataValues.title).to.equal('Chessmen from mars');
              done();
            });
        });
    });
  });

  describe('Delete Document', () => {
    it('should delete a document', (done) => {
      models.Document.destroy({ where: { id: updateDocId } })
        .then(() => {
          models.Document.findById(updateDocId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
