import React, { PropTypes } from 'react';
import SelectInput from '../common/SelectInput';
import Pagination from '../common/Pagination';

const UsersPage = ({
  users,
  nextPage,
  prevPage,
  currentPage,
  onSearch,
  search,
  onChange,
  onClick,
  user,
  options,
  onSubmit,
  deleteUser }) =>
    <div className="documents-div">

      <div className="fixed-action-btn horizontal click-to-toggle">
        <a className="btn-floating btn-large">
          <i className="large material-icons">search</i>
        </a>
        <ul>
          <form className="col s12" onSubmit={onSearch}>
            <div className="row">
              <div className="input-field col s12">
                <input value={search} id="search" name="search" type="text" onChange={onChange} />
                <label htmlFor="search" data-success="right">Search</label>
              </div>
            </div>
          </form>
        </ul>
      </div>

      <div className="container documents">
        <h3 className="recent-documents">Users</h3>

        <div className="row">

          <table className="bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>E-mail</th>
                <th>Role</th>

              </tr>
            </thead>

            <tbody>
              {users.map((currentUser) => {
                const userRole = options.find(role => role.value === Number(currentUser.roleId));
                return (<tr key={currentUser.id}>
                  <td>{currentUser.fullName}</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser.email}</td>
                  <td>{userRole ? userRole.text : ''}</td>
                  <td>
                    <a
                      href="#!"
                      className="secondary-content"
                      onClick={() => {
                        if (confirm(`Delete: ${currentUser.username}?`)) deleteUser(currentUser.id);
                      }}>
                      <i className="material-icons">delete</i>
                    </a>
                    <a
                      href="#userModal"
                      className="secondary-content"
                      onClick={e => onClick(e, currentUser)} >
                      <i className="material-icons edit-user">edit</i>
                    </a>
                  </td>
                </tr>);
              })}
            </tbody>
          </table>

        </div>
      </div>

      <Pagination
        collection={users}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage} />

      <div id="userModal" className="modal">
        <div className="modal-content">
          <h3 className="center">Edit Role</h3>
          <form onSubmit={onSubmit} >
            <SelectInput
              value={user.roleId}
              name="roleId"
              label="Choose Role"
              onChange={onChange}
              options={options}
              icon="user-plus" />

            <div className="input-field">
              <i className="fa fa-comments-o prefix" />
              <textarea
                name="about"
                id="textarea1"
                className="materialize-textarea"
                placeholder="About"
                onChange={onChange}
                value={user.about} />
            </div>


            <div className="input-field center">
              <button className="waves-effect btn">Submit</button>
            </div>
          </form>
        </div>
      </div>

    </div>;

UsersPage.propTypes = {
  options: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UsersPage;
