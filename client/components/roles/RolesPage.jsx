import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import DeleteModal from '../common/DeleteModal';

/**
 *
 *
 * @param {Object} props { roles, editRole, newRole, onClick, onChange, onSave, deleteRole }
 * @returns {Object} jsx object
 */
const RolesPage = ({ roles, editRole, newRole, onClick, onChange, onSave, deleteRole }) =>
  <div className="form-div">
    <div className="container">
      <h3 className="center">Roles</h3>

      <ul className="collection">
        {roles.map(role =>
          <li className="collection-item" key={role.id}>
            {role.name}
            {(role.id !== 1) && <span>
              <a
                href="#deleteModal"
                className="secondary-content delete-role"
                onClick={e => onClick(e, role)} >
                <i className="material-icons">delete</i>
              </a>
              <a
                href="#roleModal"
                onClick={e => onClick(e, role)}
                className="secondary-content edit-role">
                <i className="material-icons">edit</i>
              </a>
            </span>}
          </li>)}
      </ul>

      <h3 className="center">Add Role</h3>
      <form onSubmit={e => onSave(e, 'new')} >
        <div className="input-field">
          <i className="fa fa-user-secret prefix" />
          <input
            id="newRole"
            type="text"
            name="name"
            value={newRole.name}
            onChange={e => onChange(e, 'new')}
            placeholder="Role Name" />
        </div>
        {newRole.error && <div className="card-panel error white-text">{newRole.error}</div>}

        <div className="input-field center">
          <button className="waves-effect btn">Submit</button>
        </div>
      </form>

    </div>

    <div id="roleModal" className="modal">
      <div className="modal-content">
        <h3 className="center">Edit Role</h3>
        <form onSubmit={onSave}>
          <TextInput
            name="name"
            label="Edit Role"
            value={editRole.name}
            onChange={onChange}
            error={editRole.error} />

          <div className="input-field center">
            <button className="waves-effect btn">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <DeleteModal
    toBeDeleted={{ id: editRole.id, title: editRole.name }}
    deleteItem={deleteRole} />

  </div>;

RolesPage.propTypes = {
  roles: PropTypes.array.isRequired,
  newRole: PropTypes.object.isRequired,
  editRole: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired,
};

export default RolesPage;
