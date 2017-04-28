import models from '../models';

export default {
  show(req, res) {
    res.send({ message: 'found' });
  },
  create(req, res) {
    return models.Todo.create({
      title: 'title'
    })
    .then(todo => res.status(201).send(todo))
    .catch(error => res.status(400).send(error));
  }
};
