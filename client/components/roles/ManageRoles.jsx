import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RolesPage from './RolesPage';
import { saveRole, deleteRole, getRoles } from '../../actions/roleActions';
import { validateRequiredFields } from '../../utilities/validator';
import { handleError } from '../../utilities/errorHandler';

class ManageRoles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roles: [...props.roles],
      editRole: { name: '', id: '', error: '' },
      newRole: { name: '', error: '' }
    };
    this.deleteRole = this.deleteRole.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roles !== nextProps.roles) {
      this.setState({ roles: [...nextProps.roles] });
    }
  }

  componentDidMount() {
    $('.modal').modal();
  }

  deleteRole(id) {
    this.props.deleteRole(id)
      .then(() => {
        this.props.getRoles()
          .then(() => Materialize.toast('Role deleted', 2000));
      });
  }

  onChange(event, type) {
    if (type === 'new') return this.setState({ newRole: { name: event.target.value } });
    return this.setState({
      editRole: Object.assign({}, this.state.editRole, { name: event.target.value })
    });
  }

  onClick(event, role) {
    this.setState({ editRole: role });
  }

  onSave(event, type) {
    event.preventDefault();
    if (type === 'new') {
      const { valid, errors } = validateRequiredFields([this.state.newRole.name], ['name']);
      if (valid) {
        return this.props.saveRole(this.state.newRole)
          .then(() => {
            this.setState({ newRole: { name: '' } });
            Materialize.toast('Role created', 2000);
          })
          .catch(error => handleError(error));
      }
      return this.setState({ newRole: { name: '', error: errors.name } });
    }

    const { valid, errors } = validateRequiredFields([this.state.editRole.name], ['name']);
    if (valid) {
      return this.props.saveRole(this.state.editRole)
        .then(() => {
          $('#roleModal').modal('close');
          Materialize.toast('Role updated', 2000);
        })
        .catch(error => handleError(error));
    }

    return this.setState({
      editRole: Object.assign({}, this.state.editRole, { error: errors.name })
    });
  }

  render() {
    const { roles, editRole, newRole } = this.state;

    return (
      <RolesPage
        roles={roles}
        editRole={editRole}
        onClick={this.onClick}
        onChange={this.onChange}
        newRole={newRole}
        onSave={this.onSave}
        deleteRole={this.deleteRole} />
    );
  }
}

ManageRoles.propTypes = {
  roles: PropTypes.array.isRequired,
  deleteRole: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  saveRole: PropTypes.func.isRequired
};

export default connect(state => ({
  access: state.access,
  roles: state.roles
}), { saveRole, deleteRole, getRoles })(ManageRoles);
