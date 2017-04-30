import models from '../models';

export default {
  create(req, res) {
    console.log(req.body.name);
    return models.Role.create({
      name: 'admin'
    })
    .then(todo => res.status(201).send(todo))
    .catch(error => res.status(400).send(error));
  }
};
