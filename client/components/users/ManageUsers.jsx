import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersPage from './UsersPage';
import { searchUsers, saveUser, getUsers } from '../../actions/userActions';
import { handleError } from '../../utilities/errorHandler';

/**
 * Manage User container
 *
 * @class ManageUsers
 * @extends {React.Component}
 */
class ManageUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { id: '', error: '', roleId: 'null' },
      search: '',
      paginate: Object.assign({}, props.pagination)
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /**
  * Assigns updated pagination state to class state
  *
  * @param {Object} nextProps
  * @returns {Undefined} nothing
  */
  componentWillReceiveProps(nextProps) {
    if (this.props.pagination !== nextProps.pagination) {
      this.setState({ paginate: Object.assign({}, nextProps.pagination) });
    }
  }

  /**
  * Retrieve users before redering the component
  *
  * @returns {Undefined} nothing
  */
  componentWillMount() {
    this.props.getUsers();
  }

  /**
  * Initiates the modal after rendering the component
  *
  * @returns {Undefined} nothing
  */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
  * Retrieves and renders the next set of users
  *
  * @returns {Undefined} nothing
  */
  nextPage() {
    if (this.props.users.length < 9) return;
    if (this.state.paginate.query) {
      return this.props.searchUsers(this.state.search, this.state.paginate.offset + 9);
    }
    return this.props.getUsers(this.state.paginate.offset + 9);
  }

  /**
  * Retrieves and renders the previous set of users
  *
  * @returns {Undefined} nothing
  */
  prevPage() {
    if (this.state.paginate.offset < 1) return;
    if (this.state.paginate.query) {
      return this.props.searchUsers(this.state.search, this.state.paginate.offset - 9);
    }
    return this.props.getUsers(this.state.paginate.offset - 9);
  }

  /**
  * Search for users
  *
  * @param {Object} event
  * @returns {Undefined} nothing
  */
  onSearch(event) {
    event.preventDefault();
    this.props.searchUsers(this.state.search)
    .then(() => Materialize.toast('Search successful', 2000))
    .catch(error => handleError(error));
  }

  /**
  * Validate input fields and submit the form
  *
  * @param {Object} event
  * @returns {Object} state
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.saveUser(this.state.user)
      .then(() => {
        $('#userModal').modal('close');
        Materialize.toast('User updated', 2000);
      })
      .catch(error => handleError(error));
  }

  /**
  * Control input fields
  *
  * @param {Object} event
  * @returns {Undefined} nothing
  */
  onChange(event) {
    if (event.target.name === 'search') {
      return this.setState({ search: event.target.value });
    }
    return this.setState({
      user: Object.assign({}, this.state.user, { [event.target.name]: event.target.value })
    });
  }

  /**
  * Set the user to be edited to state
  *
  * @param {Object} event
  * @param {String} user
  * @returns {Undefined} nothing
  */
  onClick(event, user) {
    this.setState({ user: { id: user.id, roleId: user.roleId } });
  }

  /**
  * Render the component
  *
  * @returns {Object} jsx component
   */
  render() {
    const { users, roles } = this.props;
    const { search, user, paginate } = this.state;
    const roleOptions = [];
    roles.forEach(role => roleOptions.push({ value: role.id, text: role.name }));

    return (
      <UsersPage
        users={users}
        nextPage={this.nextPage}
        prevPage={this.prevPage}
        paginate={paginate}
        onSearch={this.onSearch}
        search={search}
        onChange={this.onChange}
        onClick={this.onClick}
        user={user}
        options={roleOptions}
        onSubmit={this.onSubmit} />
    );
  }
}

ManageUsers.propTypes = {
  roles: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired
};

ManageUsers.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(state => ({
  access: state.access,
  roles: state.roles,
  users: state.users.users,
  pagination: state.pagination
}), { saveUser, searchUsers, getUsers })(ManageUsers);
