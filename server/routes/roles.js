import roleController from '../controllers/Role';

export default (app) => {
  app.post('/roles', roleController.create);
};
