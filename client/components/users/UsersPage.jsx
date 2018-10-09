import React, { PropTypes } from 'react';
import SelectInput from '../common/SelectInput';
import Pagination from '../common/Pagination';

/**
 * Manage users page
 *
 * @param {Object} props {
 *   users,
 *   nextPage,
 *   prevPage,
 *   paginate,
 *   onSearch,
 *   search,
 *   onChange,
 *   onClick,
 *   user,
 *   options,
 *   onSubmit }
 * @returns {Object} jsx object
 */
const UsersPage = ({
  users,
  nextPage,
  prevPage,
  paginate,
  onSearch,
  search,
  onChange,
  onClick,
  user,
  options,
  onSubmit }) =>
    <div className="documents-div">
      <div className="container documents">

        <form id="searchForm" className="search-form" onSubmit={onSearch}>
          <div className="row">
            <div className="input-field col s10">
              <input
              id="search"
              type="text"
              name="search"
              placeholder="Search usernames"
              value={search}
              onChange={onChange} />
            </div>
            <div className="input-field col s2">
              <button className="waves-effect btn">Go</button>
            </div>
          </div>
        </form>

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
                  <td className="user-role">{userRole ? userRole.text : ''}</td>
                  <td>
                    {currentUser.id !== 1 && <a
                      href="#userModal"
                      className="secondary-content"
                      onClick={e => onClick(e, currentUser)} >
                      <i className="material-icons edit-user">edit</i>
                    </a>}
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
        paginate={paginate} />

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
  paginate: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default UsersPage;
