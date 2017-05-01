import roleController from '../controllers/Role';
import authenticator from '../middlewares/authenticator';

export default (app) => {
  app.get('/roles', roleController.getRoles);
  app.post('/roles', authenticator.verifyUser,
  authenticator.permitAdmin, roleController.create);

  app.get('/roles/:id', roleController.getRole);
  app.put('/roles/:id', authenticator.verifyUser,
  authenticator.permitAdmin, roleController.upadte);
  app.delete('/roles/:id', authenticator.verifyUser,
  authenticator.permitAdmin, roleController.delete);
};
