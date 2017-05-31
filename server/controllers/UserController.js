import models from '../models';
import Authenticator from '../helpers/Authenticator';
import handleError from '../helpers/handleError';
import paginate from '../helpers/paginate';

const UserController = {
  /**
  * Get users
  * Route: GET: /users or GET: /users/?limit=[integer]&offset=[integer]&q=[username]
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getUsers(req, res) {
    let searchKey = '%%';
    if (req.query.q) {
      searchKey = `%${req.query.q}%`;
    }

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 20;

    return models.User.findAndCount({
      offset,
      limit,
      attributes: ['id', 'username', 'fullName', 'email', 'roleId', 'about'],
      where: { username: {
        $iLike: searchKey
      } },
      order: [['createdAt', 'DESC']]
    })
    .then((users) => {
      const response = {
        rows: users.rows,
        metaData: paginate(users.count, limit, offset)
      };

      res.status(200).send(response);
    })
    .catch(error => handleError(error, res));
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

    return models.User.create(req.body)
      .then((user) => {
        const token = Authenticator.generateToken({
          id: user.id,
          username: user.username,
          roleId: user.roleId
        });
        const response = Authenticator.secureUserDetails(user);
        response.message = 'User created';
        response.token = token;
        return res.status(201).send(response);
      })
      .catch(error => handleError(error, res));
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

        res.status(200).send(Authenticator.secureUserDetails(user));
      })
      .catch(error => handleError(error, res));
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
        res.status(200).send(Authenticator.secureUserDetails(updatedUser)))
      .catch(error => handleError(error, res));
  },

  /**
  * Delete a user
  * Route: DELETE: /users/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  delete(req, res) {
    if (res.locals.decoded.id !== res.locals.user.id) {
      return res.status(403).send({ message: 'Access denied' });
    }

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
    return models.Document.findAll({
      where: { authorId: res.locals.user.id },
      include: [{
        model: models.User,
        attributes: ['username', 'roleId'] }],
    })
    .then((documents) => {
      res.status(200).send(documents);
    })
    .catch(error => handleError(error, res));
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
      if (user && user.verifyPassword(req.body.password)) {
        const token = Authenticator.generateToken({
          id: user.id,
          username: user.username,
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
    .catch(error => handleError(error, res));
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

export default UserController;
