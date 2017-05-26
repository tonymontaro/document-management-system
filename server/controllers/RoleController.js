import models from '../models';

const RoleController = {
  /**
  * Get roles
  * Route: GET: /roles or GET: /roles
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getRoles(req, res) {
    return models.Role.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']]
    })
    .then(roles => res.status(200).send(roles))
    .catch(error => res.status(400).send(error));
  },

  /**
  * Create a role
  * Route: POST: /roles
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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

  /**
  * Update a role
  * Route: PUT: /roles/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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

  /**
  * Delete a role
  * Route: DELETE: /roles/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
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

export default RoleController;
