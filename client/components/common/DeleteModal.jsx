import React, { PropTypes } from 'react';

/**
 * Delete Modal
 *
 * @param {Object} props { toBeDeleted, deleteItem }
 * @returns {Object} jsx object
 */
const DeleteModal = ({ toBeDeleted, deleteItem }) =>
  <div id="deleteModal" className="modal delete-modal">
    <div className="modal-content">
      <h4>Delete:</h4>
      <p>{toBeDeleted.title}</p>
    </div>
    <div className="modal-footer">
      <a
        href="#!"
        className="modal-action modal-close waves-effect teal btn-flat white-text">No</a>
      <a
        onClick={() => deleteItem(toBeDeleted.id)}
        href="#!"
        className="modal-action modal-close waves-effect red darken-4 btn-flat white-text">
          Yes
      </a>
    </div>
  </div>;

DeleteModal.propTypes = {
  toBeDeleted: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default DeleteModal;
