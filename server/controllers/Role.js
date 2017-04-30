import models from '../models';

const Role = {
  /**
  * Create a new role
  * Route: GET: /roles
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {void} no returns
  */
  create(req, res) {
    return models.Role.create(req.body)
    .then(role => res.status(201).send({
      id: role.id,
      name: role.name,
      message: 'Role created'
    }))
    .catch(error => res.status(400).send(error));
  }

  // End
};

export default Role;
