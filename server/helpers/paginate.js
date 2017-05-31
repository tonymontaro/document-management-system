
/**
 * Get the pagination metaData
 *
 * @export
 * @param {Number} count total result
 * @param {Number} limit limit per page
 * @param {Number} offset the offset
 * @returns {Object} pagination metaData
 */
export default function paginate(count, limit, offset) {
  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = (count - offset) > limit ? limit : (count - offset);

  return {
    page,
    pageCount,
    pageSize,
    totalCount: count
  };
}
