import UserController from '../controllers/UserController';
import Authenticator from '../helpers/Authenticator';

export default (app) => {
  app.post('/users', UserController.create);
  app.get('/users', Authenticator.verifyUser, Authenticator.permitAdmin,
    UserController.getUsers);

  app.get('/users/:id', Authenticator.verifyUser, UserController.getUser);
  app.put('/users/:id', Authenticator.verifyUser,
    Authenticator.permitOwnerOrAdmin, UserController.update);
  app.delete('/users/:id', Authenticator.verifyUser,
    Authenticator.permitOwnerOrAdmin, UserController.delete);

  app.post('/users/login', UserController.login);
  app.post('/users/logout', UserController.logout);

  app.get('/users/:id/documents', Authenticator.verifyUser,
    Authenticator.permitOwnerOrAdmin, UserController.getUserDocuments);
  app.get('/search/users', Authenticator.verifyUser, Authenticator.permitAdmin,
    UserController.getUsers);
};
