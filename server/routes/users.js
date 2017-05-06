import userController from '../controllers/User';
import authenticator from '../middlewares/authenticator';

export default (app) => {
  app.post('/users', userController.create);
  app.get('/users', authenticator.verifyUser, authenticator.permitAdmin,
    userController.getUsers);

  app.get('/users/:id', authenticator.verifyUser, userController.getUser);
  app.put('/users/:id', authenticator.verifyUser,
    authenticator.permitProfileOwner, userController.update);
  app.delete('/users/:id', authenticator.verifyUser,
    authenticator.permitProfileOwner, userController.delete);

  app.post('/users/login', userController.login);
  app.post('/users/logout', userController.logout);

  app.get('/users/:id/documents', authenticator.verifyUser,
    userController.getUserDocuments);
};
