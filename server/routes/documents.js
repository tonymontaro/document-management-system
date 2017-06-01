import DocumentController from '../controllers/DocumentController';
import Authenticator from '../helpers/Authenticator';

export default (app) => {
  app.get('/documents', DocumentController.getDocuments);
  app.post('/documents', Authenticator.verifyUser,
  DocumentController.create);

  app.get('/documents/:id', DocumentController.getDocument);
  app.put('/documents/:id', Authenticator.verifyUser,
  Authenticator.permitAuthor, DocumentController.update);
  app.delete('/documents/:id', Authenticator.verifyUser,
  Authenticator.permitAuthor, DocumentController.delete);

  app.get('/search/documents', DocumentController.getDocuments);
};
