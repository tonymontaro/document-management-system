import React, { PropTypes } from 'react';

/**
 * Pagination component
 *
 * @param {Object} props { collection, nextPage, prevPage, paginate }
 * @returns {Object} jsx object
 */
const Pagination = ({ collection, nextPage, prevPage, paginate }) =>
  <div>
    <ul className="pagination center">
      <li className={paginate.page < 2 ? 'disabled' : 'waves-effect'}>
        <a onClick={prevPage} href="javascript:void(0)">
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      <li>page {paginate.page} of {paginate.pageCount}</li>
      <li className={collection.length < 9 ? 'disabled' : 'waves-effect'}>
        <a onClick={nextPage} href="javascript:void(0)">
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
    <div className="center">
      Showing {paginate.pageSize} of {paginate.totalCount} results
    </div>
  </div>
  ;

Pagination.propTypes = {
  collection: PropTypes.array.isRequired,
  paginate: PropTypes.object.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default Pagination;
