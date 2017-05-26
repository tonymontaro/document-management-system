import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.SECRET || 'winter is coming';

const Authenticator = {
   /**
   * @param {Object} userDetails user details
   * @returns {String} token
   */
  generateToken(userDetails) {
    return jwt.sign(userDetails, secret, {
      expiresIn: 60 * 60 * 24
    });
  },

  /**
  * Verify user token
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
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided'
      });
    }
  },
  /**
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
  * Allow access for an admin or profile owner
  * @param {Object} req request object
  * @param {Object} res response object
  * @param {Function} next next function
  * @returns {Response} response object
  */
  permitProfileOwner(req, res, next) {
    return models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (res.locals.decoded.roleId !== 1
          && res.locals.decoded.id !== user.id) {
          return res.status(403).send({ message: 'Access denied' });
        }

        res.locals.user = user;
        next();
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * Allow access for an admin or document owner
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
        if (res.locals.decoded.roleId !== 1
          && res.locals.decoded.id !== document.authorId) {
          return res.status(403).send({ message: 'Access denied' });
        }

        res.locals.document = document;
        next();
      })
      .catch(error => res.status(400).send(error));
  },

  /** Return secure user details
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
