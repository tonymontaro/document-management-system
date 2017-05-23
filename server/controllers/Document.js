import models from '../models';
import authenticator from '../middlewares/authenticator';

const Document = {
  /**
  * Get documents
  * Route: GET: /documents or GET: /documents/?limit=[integer]&offset=[integer]&q=[title]
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getDocuments(req, res) {
    let searchKey = '%%';
    if (req.query.q) {
      searchKey = `%${req.query.q}%`;
    }

    let queryOptions = { access: 'public', title: { $iLike: searchKey } };
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const decoded = authenticator.verifyToken(token);
    if (decoded) {
      queryOptions = (decoded.roleId === 1) ? { title: { $iLike: searchKey } } : {
        $or: [
          { access: 'public' },
          { authorId: decoded.id },
          { $and: [{ authorRoleId: decoded.roleId }, { access: 'role' }] }
        ],
        title: { $iLike: searchKey } };
    }

    return models.Document.findAll({
      offset: req.query.offset || 0,
      limit: req.query.limit || 100,
      where: queryOptions,
      order: [['createdAt', 'DESC']]
    })
    .then(documents => res.status(200).send(documents))
    .catch(error => res.status(400).send(error));
  },

  /**
  * Create a document
  * Route: POST: /documents
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  create(req, res) {
    return models.User.findById(res.locals.decoded.id)
      .then((user) => {
        req.body.authorId = user.id;
        req.body.authorRoleId = user.roleId;
        req.body.author = user.username;

        return models.Document.create(req.body)
          .then((document) => {
            const response = {
              id: document.id,
              title: document.title,
              content: document.content,
              access: document.access,
              authorId: document.authorId,
              author: document.author,
              authorRoleId: document.authorRoleId,
              createdAt: document.createdAt,
              message: 'Document created'
            };
            return res.status(201).send(response);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * Get a document
  * Route: GET: /documents/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getDocument(req, res) {
    return models.Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({ message: 'Document not found' });
        }
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const decoded = authenticator.verifyToken(token);
        const userId = decoded ? decoded.id : null;
        const userRoleId = decoded ? decoded.roleId : null;
        if (document.access !== 'public'
          && userRoleId !== 1
          && userId !== document.authorId
          && !(document.access === 'role'
            && userRoleId === document.authorRoleId)) {
          return res.status(403).send({ message: 'Access denied' });
        }

        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  },

  /**
  * Update a document
  * Route: PUT: /documents/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  update(req, res) {
    return res.locals.document
      .update(req.body, { fields: Object.keys(req.body) })
      .then(updatedDocument => res.status(200).send(updatedDocument))
      .catch(error => res.status(400).send(error));
  },

  /**
  * Delete a document
  * Route: DELETE: /documents/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  delete(req, res) {
    res.locals.document.destroy()
      .then(() => res.status(200).send({ message: 'Document deleted' }));
  },

};

export default Document;
