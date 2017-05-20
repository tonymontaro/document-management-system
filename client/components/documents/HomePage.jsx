import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDocuments, updatePage, deleteDocument, searchDocument } from '../../actions/documentActions';
import HomePageDiv from './HomePageDiv';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({ editMode: false, search: '' }, props.page);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page.offset !== nextProps.page.offset) {
      this.setState(Object.assign({}, nextProps.page));
    }
  }

  prevPage() {
    if (this.state.offset < 1) return;
    this.props.getDocuments(this.state.offset - 9)
    .then(() => {
      if (this.state.offset > 0) this.props.updatePage('prev');
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
    if (event.target.name === 'editMode') {
      return this.setState({ editMode: event.target.checked });
    }
    return this.setState({ [event.target.name]: event.target.value });
  }

  nextPage() {
    if (this.props.documents.length < 9) return;
    this.props.getDocuments(this.state.offset + 9)
      .then(() => {
        this.props.updatePage();
      });
  }

  onSearch(event) {
    event.preventDefault();
    this.props.searchDocument(this.state.search);
  }

  render() {
    const { documents, access } = this.props;
    const { currentPage, editMode, search } = this.state;

    return (
      <HomePageDiv
      search={search}
      onSearch={this.onSearch}
      onChange={this.onChange}
      access={access}
      documents={documents}
      deleteDocument={this.deleteDocument}
      editMode={editMode}
      nextPage={this.nextPage}
      prevPage={this.prevPage}
      currentPage={currentPage} />
    );
  }
}

HomePage.propTypes = {
  page: PropTypes.object.isRequired,
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
  page: state.page
}), { getDocuments, updatePage, deleteDocument, searchDocument })(HomePage);
