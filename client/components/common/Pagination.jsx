import React, { PropTypes } from 'react';

const Pagination = ({ collection, nextPage, prevPage, currentPage }) =>
  <ul className="pagination center">
    <li className={currentPage < 2 ? 'disabled' : 'waves-effect'}><a onClick={prevPage} href="javascript:void(0)">
      <i className="material-icons">chevron_left</i>
    </a></li>
    <li>page {currentPage}</li>
    <li className={collection.length < 9 ? 'disabled' : 'waves-effect'}><a onClick={nextPage} href="javascript:void(0)">
      <i className="material-icons">chevron_right</i>
    </a></li>
  </ul>;

Pagination.propTypes = {
  collection: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
};

export default Pagination;
