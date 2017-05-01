import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.SECRET || 'winter is coming';

const Authenticator = {
  generateToken(userDetails) {
    return jwt.sign(userDetails, secret, {
      expiresIn: 60 * 60 * 24
    });
  },

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

  permitAdmin(req, res, next) {
    models.Role.findById(res.locals.decoded.roleId)
      .then((role) => {
        if (role.name === 'admin') {
          next();
        } else {
          return res.status(403).send({ message: 'Permission denied' });
        }
      });
  },

  permitOwner(req, res, next) {
    models.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (res.locals.decoded.roleId !== 1
          && res.locals.decoded.id !== user.id) {
          return res.status(403).send({ message: 'Permission denied' });
        }

        res.locals.user = user;
        next();
      })
      .catch(error => res.status(400).send(error));
  },

  secureUserDetails(user) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId,
    };
  }
};

export default Authenticator;
