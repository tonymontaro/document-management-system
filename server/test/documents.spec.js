import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import models from '../models';
import testData from './testData';

const {
  editorOne, editorTwo, admin, regularUser,
  roleOne, privateDocument, roleDocument
 } = testData;
let regularToken, adminToken, editorOneToken;

const expect = chai.expect;
chai.use(chaiHttp);

describe('Documents', () => {
  before((done) => {
    models.Role.create(roleOne)
    .then((role) => {
      editorOne.roleId = role.id;
      editorTwo.roleId = role.id;
      models.User.bulkCreate([
        editorOne, editorTwo
      ])
      .then(() => {
        chai.request(server)
          .post('/users/login')
          .send({ username: editorOne.username, password: 'alpine' })
          .end((err, res) => {
            editorOneToken = res.body.token;
            done();
          });
      });
    });
  });
  after((done) => {
    models.Role.destroy({
      where: { id: { $notIn: [1, 2] } }
    })
    .then(() => models.User.destroy({
      where: { id: { $notIn: [1, 2] } }
    }))
      .then(() => done());
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
  before((done) => {
    chai.request(server)
      .post('/users/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
      });
  });
  // POST /documents
  describe('/POST document', () => {
    it('can create a new document', (done) => {
      chai.request(server)
      .post('/documents')
      .send(privateDocument)
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'title', 'content', 'access', 'authorId',
            'authorRoleId', 'createdAt', 'message']
        );
        expect(res.body.authorId).to.equal(2);
        expect(res.body.title).to.equal(privateDocument.title);
        expect(res.body.message).to.eql('Document created');
        privateDocument.docId = res.body.id;
        done();
      });
    });

    it('should fail if document title already exists', (done) => {
      chai.request(server)
      .post('/documents')
      .send(privateDocument)
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].message).to.eql('title must be unique');
        done();
      });
    });

    it('can create a new document with the correct authorRoleId', (done) => {
      chai.request(server)
      .post('/documents')
      .send(roleDocument)
      .set({ 'x-access-token': editorOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['id', 'title', 'content', 'access', 'authorId',
            'authorRoleId', 'createdAt', 'message']
        );
        expect(res.body.authorRoleId).to.equal(editorOne.roleId);
        expect(res.body.message).to.eql('Document created');
        roleDocument.docId = res.body.id;
        done();
      });
    });
  });

  // GET /documents
  describe('/GET documents', () => {
    it('should return all documents if the user is an admin', (done) => {
      chai.request(server)
        .get('/documents')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(4);
          done();
        });
    });

    it('should return only public documents for an anonymous user', (done) => {
      chai.request(server)
      .get('/documents')
      .end((err, res) => {
        let allPublicDocuments = true;
        res.body.forEach((document) => {
          if (document.access !== 'public') allPublicDocuments = false;
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(2);
        expect(allPublicDocuments).to.be.true;
        done();
      });
    });

    it('should return only documents accessible by a given user', (done) => {
      chai.request(server)
        .get('/documents')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          let noRoleDocument = true;
          res.body.forEach((document) => {
            if (document.access === 'role') noRoleDocument = false;
          });
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(3);
          expect(noRoleDocument).to.be.true;
          done();
        });
    });

    it('should return correct documents(s) for a query', (done) => {
      chai.request(server)
        .get('/documents?q=DMS')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].title).to.eql('DMS Welcome Message');
          done();
        });
    });

    it('can limit the number of documents returned', (done) => {
      chai.request(server)
        .get('/documents?limit=2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(2);
          expect(res.body[0].id).to.eql(1);
          done();
        });
    });

    it('can offset the starting position of returned documents', (done) => {
      chai.request(server)
        .get('/documents?offset=1')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].id).to.eql(2);
          done();
        });
    });
  });

  // GET /documents/:id
  describe('/GET/:id user', () => {
    let editorTwoToken;
    before((done) => {
      chai.request(server)
        .post('/users/login')
        .send({ username: editorTwo.username, password: 'alpine' })
        .end((err, res) => {
          editorTwoToken = res.body.token;
          done();
        });
    });

    it('should return a particular document given an id', (done) => {
      chai.request(server)
        .get('/documents/1')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.keys(['id', 'title', 'content', 'access',
            'authorId', 'authorRoleId', 'createdAt', 'updatedAt']);
          expect(res.body.title).to.equal('DMS Welcome Message');
          done();
        });
    });

    it('should deny access to an anonymous user', (done) => {
      chai.request(server)
      .get('/documents/2')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('No token provided');
        done();
      });
    });

    it("should not allow a user to access another user's private document",
    (done) => {
      chai.request(server)
      .get(`/documents/${privateDocument.docId}`)
      .set({ 'x-access-token': editorOneToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });

    it('should allow a user to access a document with the same role',
    (done) => {
      chai.request(server)
      .get(`/documents/${roleDocument.docId}`)
      .set({ 'x-access-token': editorTwoToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.keys(['id', 'title', 'content', 'access',
          'authorId', 'authorRoleId', 'createdAt', 'updatedAt']);
        expect(res.body.authorRoleId).to.equal(editorTwo.roleId);
        done();
      });
    });

    it('should send "Document not found" for an invalid id', (done) => {
      chai.request(server)
      .get('/documents/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Document not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .get('/documents/3000000000')
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

  // PUT /documents/:id
  describe('/PUT/:id user', () => {
    it('should allow a user to update his/her document', (done) => {
      chai.request(server)
      .put('/documents/2')
      .set({ 'x-access-token': regularToken })
      .send({ title: 'Chess GrandMaster from Mars' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.title).to.eql('Chess GrandMaster from Mars');
        done();
      });
    });

    it("should deny access if a user tries to update another user's document",
    (done) => {
      chai.request(server)
      .put('/documents/2')
      .set({ 'x-access-token': editorOneToken })
      .send({ title: 'The Incredible True Story' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });

    it("should allow admin to update a user's document", (done) => {
      chai.request(server)
      .put('/documents/2')
      .set({ 'x-access-token': adminToken })
      .send({ title: 'A Song of Ice and Fire III' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.title).to.eql('A Song of Ice and Fire III');
        done();
      });
    });

    it('should not allow a user to use an existing document title',
    (done) => {
      chai.request(server)
      .put(`/documents/${privateDocument.docId}`)
      .set({ 'x-access-token': adminToken })
      .send({ title: 'A Song of Ice and Fire III' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.errors[0].message).to.eql('title must be unique');
        done();
      });
    });
  });

  // DELETE /documents/:id
  describe('/DELETE/:id document', () => {
    it("should deny access if a user tries to delete another user's document",
    (done) => {
      chai.request(server)
      .delete(`/documents/${roleDocument.docId}`)
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Access denied');
        done();
      });
    });

    it("should allow admin to delete a user's document", (done) => {
      chai.request(server)
      .delete(`/documents/${roleDocument.docId}`)
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Document deleted');
        done();
      });
    });

    it('should allow a user to delete his/her document', (done) => {
      chai.request(server)
      .delete(`/documents/${privateDocument.docId}`)
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Document deleted');
        done();
      });
    });

    it('should send "Document not found" given an invalid id', (done) => {
      chai.request(server)
      .delete('/documents/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Document not found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .delete('/documents/3000000000')
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
