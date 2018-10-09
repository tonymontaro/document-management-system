import RoleController from '../controllers/RoleController';
import Authenticator from '../helpers/Authenticator';

export default (app) => {
  app.get('/roles', RoleController.getRoles);
  app.post('/roles', Authenticator.verifyUser,
  Authenticator.permitAdmin, RoleController.create);

  app.get('/roles/:id', RoleController.getRole);
  app.put('/roles/:id', Authenticator.verifyUser,
  Authenticator.permitAdmin, RoleController.upadte);
  app.delete('/roles/:id', Authenticator.verifyUser,
  Authenticator.permitAdmin, RoleController.delete);
};
