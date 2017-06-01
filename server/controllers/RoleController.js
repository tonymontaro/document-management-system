import models from '../models';
import handleError from '../helpers/handleError';

const RoleController = {
  /**
  * Get roles
  * Route: GET: /roles or GET: /roles
  *
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
    .catch(error => handleError(error, res));
  },

  /**
  * Create a role
  * Route: POST: /roles
  *
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
    .catch(error => handleError(error, res));
  },

  getRole(req, res) {
    return models.Role.findById(req.params.id)
      .then((role) => {
        if (!role) return res.status(404).send({ message: 'Role not found' });

        res.status(200).send({ id: role.id, name: role.name });
      })
      .catch(error => handleError(error, res));
  },

  /**
  * Update a role
  * Route: PUT: /roles/:id
  *
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
          .catch(error => handleError(error, res));
      })
      .catch(error => handleError(error, res));
  },

  /**
  * Delete a role
  * Route: DELETE: /roles/:id
  *
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
      .catch(error => handleError(error, res));
  }
};

export default RoleController;
