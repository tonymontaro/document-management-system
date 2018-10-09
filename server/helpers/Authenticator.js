import jwt from 'jsonwebtoken';
import models from '../models';
import handleError from '../helpers/handleError';

const secret = process.env.SECRET || 'winter is coming';

const Authenticator = {
  /**
  * Generate a token
  *
  * @param {Object} userDetails user details
  * @returns {String} token
  */
  generateToken(userDetails) {
    return jwt.sign(userDetails, secret, {
      expiresIn: 60 * 60 * 24 * 7
    });
  },

  /**
  * Verify a user
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  verifyUser(req, res, next) {
    const token = req.body.token
      || req.query.token
      || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'Authentication failed' });
        }

        res.locals.decoded = decoded;
        return next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided'
      });
    }
  },

 /**
  * Verify user token
  *
  * @param {String} token the token
  * @returns {Object|Boolean} decoded token or false
  */
  verifyToken(token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return false;
    }
  },
/**
  * Allow access for an admin only
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  permitAdmin(req, res, next) {
    if (res.locals.decoded.roleId === 1) {
      return next();
    }

    return res.status(403).send({ message: 'Access denied' });
  },

  /**
  * Permit an admin or profile owner
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  permitOwnerOrAdmin(req, res, next) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (res.locals.decoded.roleId !== 1
          && res.locals.decoded.id !== user.id) {
          return res.status(403).send({ message: 'Access denied' });
        }

        res.locals.user = user;
        return next();
      })
      .catch(error => handleError(error, res));
  },

  /**
  * Allow access for the document author
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  permitAuthor(req, res, next) {
    return models.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({ message: 'Document not found' });
        }

        if (res.locals.decoded.id !== document.authorId) {
          return res.status(403).send({ message: 'Access denied' });
        }

        res.locals.document = document;
        return next();
      })
      .catch(error => handleError(error, res));
  },

  /**
  * Return secure user details
  *
  * @param {String} user user details
  * @returns {Object} secure data
  */
  secureUserDetails(user) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId,
      about: user.about
    };
  }
};

export default Authenticator;
