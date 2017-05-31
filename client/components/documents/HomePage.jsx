import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDocuments, deleteDocument, searchDocument, getUserDocuments }
  from '../../actions/documentActions';
import HomePageDiv from './HomePageDiv';
import { handleError } from '../../utilities/errorHandler';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      toBeDeleted: {},
      paginate: Object.assign({}, props.pagination)
    };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pagination !== nextProps.pagination) {
      this.setState({ paginate: Object.assign({}, nextProps.pagination) });
    }
  }

  componentDidMount() {
    $('.modal').modal();
  }

  nextPage() {
    if (this.props.documents.length < 9) return;
    if (this.state.paginate.query) {
      return this.props.searchDocument(this.state.search, this.state.paginate.offset + 9);
    }
    return this.props.getDocuments(this.state.paginate.offset + 9);
  }

  prevPage() {
    if (this.state.paginate.offset < 1) return;
    if (this.state.paginate.query) {
      return this.props.searchDocument(this.state.search, this.state.paginate.offset - 9);
    }
    return this.props.getDocuments(this.state.paginate.offset - 9);
  }

  confirmDelete(document) {
    this.setState({ toBeDeleted: { id: document.id, title: document.title } });
  }

  deleteDocument(id) {
    this.props.deleteDocument(id)
      .then(() => {
        this.props.getDocuments(this.state.paginate.offset)
          .then(() => Materialize.toast('Document deleted', 2000));
      });
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  onSearch(event) {
    event.preventDefault();
    this.props.searchDocument(this.state.search)
      .then(() => Materialize.toast('Search successful', 2000))
      .catch(error => handleError(error));
  }

  render() {
    const { documents, access } = this.props;
    const { search, paginate, toBeDeleted } = this.state;

    return (
      <HomePageDiv
      search={search}
      onSearch={this.onSearch}
      onChange={this.onChange}
      access={access}
      toBeDeleted={toBeDeleted}
      documents={documents}
      confirmDelete={this.confirmDelete}
      deleteDocument={this.deleteDocument}
      nextPage={this.nextPage}
      prevPage={this.prevPage}
      paginate={paginate} />
    );
  }
}

HomePage.propTypes = {
  pagination: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  access: PropTypes.object.isRequired,
  getDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  searchDocument: PropTypes.func.isRequired,
};

HomePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({
  documents: state.documents,
  access: state.access,
  pagination: state.pagination
}), { getDocuments, deleteDocument, searchDocument, getUserDocuments })(HomePage);
