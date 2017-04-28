import todoController from '../controllers/Todo';

export default (app) => {
  app.get('/todo', todoController.show);
  app.post('/todo', todoController.create);
};
