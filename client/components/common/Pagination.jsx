import React, { PropTypes } from 'react';

/**
 * Pagination component
 *
 * @param {Object} props { collection, nextPage, prevPage, paginate }
 * @returns {Object} jsx object
 */
const Pagination = ({ nextPage, prevPage, paginate }) =>
  <div>
    <ul className="pagination center">
      <li className={paginate.page < 2 ? 'disabled' : 'waves-effect'}>
        <a onClick={prevPage} href="javascript:void(0)">
          <i className="material-icons paginate-prev">chevron_left</i>
        </a>
      </li>
      <li>page {paginate.page} of {paginate.pageCount}</li>
      <li className={(paginate.offset + 9 >= paginate.totalCount) ? 'disabled' : 'waves-effect'}>
        <a onClick={nextPage} href="javascript:void(0)">
          <i className="material-icons paginate-next">chevron_right</i>
        </a>
      </li>
    </ul>
    <div className="center">
      Showing {paginate.pageSize} of {paginate.totalCount} results
    </div>
  </div>
  ;

Pagination.propTypes = {
  paginate: PropTypes.object.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default Pagination;
