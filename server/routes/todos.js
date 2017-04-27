import todoController from '../controllers/todo';

export default (app) => {
  app.get('/todo', todoController.show);
  app.post('/todo', todoController.create);
};
