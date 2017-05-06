import bcrypt from 'bcrypt';
import models from '../models';
import authenticator from '../middlewares/authenticator';

const User = {
  /**
  * Get users
  * Route: GET: /users or GET: /users/?limit=[integer]&offset=[integer]
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getUsers(req, res) {
    let searchKey = '%%';
    if (req.query.q) {
      searchKey = `%${req.query.q}%`;
    }

    return models.User.findAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || null,
      attributes: ['id', 'username', 'fullName', 'email', 'roleId'],
      where: { username: {
        like: searchKey
      } },
      order: [['id', 'ASC']]
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },

  /**
  * Create a user
  * Route: POST: /users
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  create(req, res) {
    if (req.body.roleId === '1') {
      return res.status(401).send({ message: 'Invalid roleId' });
    }
    req.body.password =
      bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    return models.User.create(req.body)
      .then((user) => {
        const token = authenticator.generateToken({
          id: user.id,
          roleId: user.roleId
        });
        const response = authenticator.secureUserDetails(user);
        response.message = 'User created';
        response.token = token;
        return res.status(201).send(response);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * Get a user
  * Route: GET: /users/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getUser(req, res) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        res.status(200).send(authenticator.secureUserDetails(user));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * Update a user
  * Route: PUT: /users/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  update(req, res) {
    if (req.body.roleId === '1' && res.locals.decoded.roleId !== 1) {
      return res.status(403).send({
        message: 'Only an admin can upgrade a user to an admin role'
      });
    }

    return res.locals.user.update(req.body, { fields: Object.keys(req.body) })
      .then(updatedUser =>
        res.status(200).send(authenticator.secureUserDetails(updatedUser)))
      .catch(error => res.status(400).send(error));
  },

  /**
  * Delete a user
  * Route: DELETE: /users/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  delete(req, res) {
    return res.locals.user.destroy()
      .then(() => res.status(200).send({ message: 'User deleted' }));
  },

  /**
  * Get a user's documents
  * Route: GET: /users/:id/documents
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getUserDocuments(req, res) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        return models.Document.findAll({
          where: { authorId: user.id }
        })
        .then((documents) => {
          res.status(200).send(documents);
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * Login a user
  * Route: POST: /users/login
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  login(req, res) {
    return models.User.findOne({ where: {
      username: req.body.username
    } })
    .then((user) => {
      if (user &&
      bcrypt.compareSync(req.body.password, user.password)) {
        const token = authenticator.generateToken({
          id: user.id,
          roleId: user.roleId
        });
        res.status(200).send({
          token,
          message: 'Login successful'
        });
      } else {
        res.status(401).send({ message: 'Wrong password or username' });
      }
    })
    .catch(error => res.status(400).send(error));
  },

  /**
  * Logout a user
  * Route: POST: /users/login
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  logout(req, res) {
    return res.status(200).send({
      message: 'Success, delete user token on the client'
    });
  }
};

export default User;
