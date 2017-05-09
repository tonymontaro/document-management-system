import documentController from '../controllers/Document';
import authenticator from '../middlewares/authenticator';

export default (app) => {
  app.get('/documents', documentController.getDocuments);
  app.post('/documents', authenticator.verifyUser,
  documentController.create);

  app.get('/documents/:id', authenticator.verifyUser,
  documentController.getDocument);
  app.put('/documents/:id', authenticator.verifyUser,
  authenticator.permitAuthor, documentController.update);
  app.delete('/documents/:id', authenticator.verifyUser,
  authenticator.permitAuthor, documentController.delete);
};
