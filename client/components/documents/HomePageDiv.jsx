import React, { PropTypes } from 'react';
import Pagination from '../common/Pagination';
import DocumentCard from './DocumentCard';

const HomePageDiv = ({
  search,
  onSearch,
  onChange,
  access,
  documents,
  deleteDocument,
  editMode,
  nextPage,
  prevPage,
  currentPage,
  query }) =>
    <div className="documents-div">

      <div className="fixed-action-btn horizontal click-to-toggle">
        <a className="btn-floating btn-large">
          <i className="large material-icons">search</i>
        </a>
        <ul>
          <form id="searchForm" className="search-form" onSubmit={onSearch}>
            <div className="input-field">
              <input
                id="search"
                type="text"
                name="search"
                value={search}
                onChange={onChange} />
              <label htmlFor="search" data-success="right">Search</label>
            </div>
          </form>
        </ul>
      </div>

      {access.loggedIn && <div className="edit-mode">
        <span className="switch">
          <label>
            <input
              type="checkbox"
              name="editMode"
              onChange={onChange} />
            <span className="lever" />
            Edit Mode
          </label>
        </span>
      </div>}

      <div className="container documents">
        {query ? <h3 className="recent-documents">
          Search result for: <span className="teal-text">{query}</span></h3> :
        <h3 className="recent-documents">Recently Added Documents</h3>}
        <div className="row">

          {documents.map(document =>
            <DocumentCard
              key={document.id}
              document={document}
              user={access.user}
              deleteDocument={deleteDocument}
              editMode={editMode} />
          )}

        </div>

        <Pagination
          collection={documents}
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage} />
      </div>
    </div>;

HomePageDiv.propTypes = {
  onChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  documents: PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default HomePageDiv;
