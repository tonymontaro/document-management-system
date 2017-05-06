import models from '../models';

const Role = {

  getRoles(req, res) {
    return models.Role.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']]
    })
    .then(roles => res.status(200).send(roles))
    .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return models.Role.create(req.body)
    .then(role => res.status(201).send({
      id: role.id,
      name: role.name,
      message: 'Role created'
    }))
    .catch(error => res.status(400).send(error));
  },

  getRole(req, res) {
    return models.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404).send({ message: 'Role not found' });

        res.status(200).send({ id: role.id, name: role.name });
      })
      .catch(error => res.status(400).send(error));
  },

  upadte(req, res) {
    return models.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404).send({ message: 'Role not found' });

        role.update(req.body)
          .then(updatedRole =>
          res.status(200).send({ id: updatedRole.id, name: updatedRole.name }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return models.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404).send({ message: 'Role not found' });

        role.destroy(req.body)
          .then(() => res.status(200).send({ message: 'Role deleted' }));
      })
      .catch(error => res.status(400).send(error));
  }
};

export default Role;
