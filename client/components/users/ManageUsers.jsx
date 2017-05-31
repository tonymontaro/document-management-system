import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UsersPage from './UsersPage';
import { searchUsers, saveUser, deleteUser, getUsers } from '../../actions/userActions';
import { handleError } from '../../utilities/errorHandler';

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
    this.deleteUser = this.deleteUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pagination !== nextProps.pagination) {
      this.setState({ paginate: Object.assign({}, nextProps.pagination) });
    }
  }

  componentWillMount() {
    this.props.getUsers();
  }

  componentDidMount() {
    $('.modal').modal();
  }

  nextPage() {
    if (this.props.users.length < 9) return;
    if (this.state.paginate.query) {
      return this.props.searchUsers(this.state.search, this.state.paginate.offset + 9);
    }
    return this.props.getUsers(this.state.paginate.offset + 9);
  }

  prevPage() {
    if (this.state.paginate.offset < 1) return;
    if (this.state.paginate.query) {
      return this.props.searchUsers(this.state.search, this.state.paginate.offset - 9);
    }
    return this.props.getUsers(this.state.paginate.offset - 9);
  }

  onSearch(event) {
    event.preventDefault();
    this.props.searchUsers(this.state.search)
    .then(() => Materialize.toast('Search successful', 2000))
    .catch(error => handleError(error));
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.saveUser(this.state.user)
      .then(() => {
        $('#userModal').modal('close');
        Materialize.toast('User updated', 2000);
      })
      .catch(error => handleError(error));
  }

  deleteUser(id) {
    this.props.deleteUser(id)
      .then(() => {
        this.props.getUsers(this.state.paginate.offset)
          .then(() => Materialize.toast('User deleted', 2000));
      });
  }

  onChange(event) {
    if (event.target.name === 'search') {
      return this.setState({ search: event.target.value });
    }
    return this.setState({
      user: Object.assign({}, this.state.user, { [event.target.name]: event.target.value })
    });
  }

  onClick(event, user) {
    this.setState({ user: { id: user.id, roleId: user.roleId } });
  }

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
        onSubmit={this.onSubmit}
        deleteUser={this.deleteUser} />
    );
  }
}

ManageUsers.propTypes = {
  roles: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  saveUser: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

ManageUsers.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(state => ({
  access: state.access,
  roles: state.roles,
  users: state.users.users,
  pagination: state.pagination
}), { saveUser, searchUsers, deleteUser, getUsers })(ManageUsers);
