/**
 * Handle promise errors
 *
 * @param {Object} error error object
 * @param {Function} res server response function
 * @returns {Function} function that displays an error message
 */
export default function handleError(error, res) {
  return error.errors ?
    res.status(400).send({ message: error.errors[0].message }) :
    res.status(400).send({ message: error.message });
}
