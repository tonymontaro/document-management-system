import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { getDocuments, updatePage } from '../../actions/documentActions';
import DocumentCard from './DocumentCard';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.page);
    this.state = Object.assign({}, props.page);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
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
      this.props.updatePage('prev');
    });
  }

  nextPage() {
    if (this.props.documents.length < 9) return;
    this.props.getDocuments(this.state.offset + 9)
      .then(() => {
        this.props.updatePage();
      });
  }

  render() {
    const { documents, access } = this.props;
    const { currentPage } = this.state;

    return (
      <div className="documents-div">

        <div className="container documents">
          <h3 className="recent-documents">Recently Added Documents</h3>
          <div className="row">

            {documents.map(document =>
              <DocumentCard key={document.id} document={document} user={access.user} />
            )}

          </div>
          <ul className="pagination center">
            <li className={currentPage < 2 ? 'disabled' : 'waves-effect'}><a onClick={this.prevPage} href="javascript:void(0)">
              <i className="material-icons">chevron_left</i>
            </a></li>
            <li>page {currentPage}</li>
            <li className={documents.length < 9 ? 'disabled' : 'waves-effect'}><a onClick={this.nextPage} href="javascript:void(0)">
              <i className="material-icons">chevron_right</i>
            </a></li>
          </ul>
        </div>
      </div>
    );
  }
}

HomePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({
  documents: state.documents,
  access: state.access,
  page: state.page
}), { getDocuments, updatePage })(HomePage);
