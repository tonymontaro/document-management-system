import models from '../models';
import Authenticator from '../helpers/Authenticator';
import handleError from '../helpers/handleError';
import paginate from '../helpers/paginate';

const DocumentController = {
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
    const decoded = Authenticator.verifyToken(token);
    if (decoded) {
      queryOptions = (decoded.roleId === 1) ? { title: { $iLike: searchKey } } : {
        $or: [
          { access: 'public' },
          { authorId: decoded.id },
          { $and: [{ authorRoleId: decoded.roleId }, { access: 'role' }] }
        ],
        title: { $iLike: searchKey } };
    }

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 20;

    return models.Document.findAndCount({
      offset,
      limit,
      where: queryOptions,
      include: [{
        model: models.User,
        attributes: ['username', 'roleId'] }],
      order: [['createdAt', 'DESC']]
    })
    .then((documents) => {
      const response = {
        rows: documents.rows,
        metaData: paginate(documents.count, limit, offset)
      };

      res.status(200).send(response);
    })
    .catch(error => handleError(error, res));
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

        return models.Document.create(req.body)
          .then((document) => {
            const response = {
              id: document.id,
              title: document.title,
              content: document.content,
              access: document.access,
              User: { username: user.username, roleId: user.roleId },
              authorId: document.authorId,
              createdAt: document.createdAt,
              message: 'Document created'
            };
            return res.status(201).send(response);
          })
          .catch(error => handleError(error, res));
      })
      .catch(error => handleError(error, res));
  },

  /**
  * Get a document
  * Route: GET: /documents/:id
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  getDocument(req, res) {
    return models.Document.findById(req.params.id, {
      include: [{
        model: models.User,
        attributes: ['username', 'roleId'] }]
    })
      .then((document) => {
        if (!document) {
          return res.status(404).send({ message: 'Document not found' });
        }
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const decoded = Authenticator.verifyToken(token);
        const userId = decoded ? decoded.id : null;
        const userRoleId = decoded ? decoded.roleId : null;
        if (document.access !== 'public'
          && userRoleId !== 1
          && userId !== document.authorId
          && !(document.access === 'role'
            && userRoleId === document.User.roleId)) {
          return res.status(403).send({ message: 'Access denied' });
        }

        return res.status(200).send(document);
      })
      .catch(error => handleError(error, res));
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
      .then((updatedDocument) => {
        return models.Document.findById(updatedDocument.id, {
          include: [{
            model: models.User,
            attributes: ['username', 'roleId'] }]
        })
        .then(document => res.status(200).send(document));
      })
      .catch(error => handleError(error, res));
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

export default DocumentController;
