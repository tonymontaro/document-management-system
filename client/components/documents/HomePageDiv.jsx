import React, { PropTypes } from 'react';
import Pagination from '../common/Pagination';
import DocumentCard from './DocumentCard';
import DeleteModal from '../common/DeleteModal';

/**
 * Home page component
 *
 * @param {Object} props {
 *   search,
 *   onSearch,
 *   onChange,
 *   access,
 *   documents,
 *   toBeDeleted,
 *   confirmDelete,
 *   deleteDocument,
 *   nextPage,
 *   prevPage,
 *   paginate }
 * @returns {Object} jsx object
 */
const HomePageDiv = ({
  search,
  onSearch,
  onChange,
  access,
  documents,
  toBeDeleted,
  confirmDelete,
  deleteDocument,
  nextPage,
  prevPage,
  paginate,
  isMyDocuments }) =>
    <div className="documents-div">

      <div className="container documents">
        {paginate.query ? <h3 className="recent-documents">
          Search result for: <span className="teal-text">{paginate.query}</span></h3> :
        <h3 className="recent-documents">Recently Added Documents</h3>}

        <form id="searchForm" className="search-form" onSubmit={onSearch}>
          <div className="row">
            <div className="input-field col s10">
              <input
              id="search"
              type="text"
              name="search"
              placeholder="Search"
              value={search}
              onChange={onChange} />
            </div>
            <div className="input-field col s2">
              <button className="waves-effect btn">Go</button>
            </div>
          </div>
        </form>

        <div className="row">

          {documents.map(document =>
            <DocumentCard
              key={document.id}
              document={document}
              confirmDelete={confirmDelete}
              user={access.user} />
          )}

        </div>

        {!isMyDocuments && <Pagination
          collection={documents}
          nextPage={nextPage}
          prevPage={prevPage}
          paginate={paginate} />}
      </div>

      <DeleteModal
      toBeDeleted={toBeDeleted}
      deleteItem={deleteDocument} />

    </div>;

HomePageDiv.propTypes = {
  onChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired,
  toBeDeleted: PropTypes.object.isRequired,
  paginate: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  isMyDocuments: PropTypes.bool.isRequired
};

export default HomePageDiv;
