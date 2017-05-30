import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDocuments, deleteDocument, searchDocument, getUserDocuments }
  from '../../actions/documentActions';
import updatePage from '../../actions/paginationActions';
import HomePageDiv from './HomePageDiv';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({ search: '' }, props.pagination);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pagination.offset !== nextProps.pagination.offset ||
      this.props.pagination.query !== nextProps.pagination.query) {
      this.setState(Object.assign({}, nextProps.pagination));
    }
  }

  nextPage() {
    if (this.props.documents.length < 9) return;
    if (this.state.query) {
      return this.props.searchDocument(this.state.search, this.state.offset + 9)
        .then(() => {
          this.props.updatePage('next');
        });
    }
    return this.props.getDocuments(this.state.offset + 9)
      .then(() => {
        this.props.updatePage('next');
      });
  }

  prevPage() {
    if (this.state.offset < 1) return;
    if (this.state.query) {
      return this.props.searchDocument(this.state.search, this.state.offset - 9)
        .then(() => {
          this.props.updatePage('prev');
        });
    }
    return this.props.getDocuments(this.state.offset - 9)
    .then(() => {
      this.props.updatePage('prev');
    });
  }

  deleteDocument(id) {
    this.props.deleteDocument(id)
      .then(() => {
        this.props.getDocuments(this.state.offset)
          .then(() => Materialize.toast('Document deleted', 2000));
      });
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  onSearch(event) {
    event.preventDefault();
    this.props.searchDocument(this.state.search);
  }

  render() {
    const { documents, access } = this.props;
    const { currentPage, search, query } = this.state;

    return (
      <HomePageDiv
      search={search}
      onSearch={this.onSearch}
      onChange={this.onChange}
      access={access}
      documents={documents}
      deleteDocument={this.deleteDocument}
      nextPage={this.nextPage}
      prevPage={this.prevPage}
      currentPage={currentPage}
      query={query} />
    );
  }
}

HomePage.propTypes = {
  pagination: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  access: PropTypes.object.isRequired,
  getDocuments: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
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
}), { getDocuments, updatePage, deleteDocument, searchDocument, getUserDocuments })(HomePage);
