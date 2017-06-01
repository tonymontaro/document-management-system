import validator from 'validator';
/**
* Validate required fields
*
* @param {Array} inputFields values
* @param {Function} requiredFields names of fields
* @returns {Object} object containing the status and possible error messages
*/
export function validateRequiredFields(inputFields = [], requiredFields = []) {
  const errors = {};
  let valid = true;

  inputFields.forEach((field, index) => {
    if (validator.isEmpty(String(field))) {
      errors[requiredFields[index]] = `Please enter the ${requiredFields[index]}`;
      valid = false;
    }
  });

  return { errors, valid };
}

/**
* Validate login
*
* @param {Object} inputFields user details
* @returns {Object} object containing the status and possible error messages
*/
export function validateLogin({ username = '', password = '' }) {
  return validateRequiredFields([username, password], ['username', 'password']);
}

/**
* Validate signup
*
* @param {Object} inputFields user details
* @returns {Object} object containing the status and possible error messages
*/
export function validateSignUp({
  username = '', password = '', fullName = '', email = '', confirmPassword
}) {
  const status = validateRequiredFields(
    [username, password, fullName, email],
    ['username', 'password', 'fullName', 'email']);

  if (!validator.isEmail(email)) {
    status.errors.email = 'Please enter a valid email';
    status.valid = false;
  }

  if (password !== confirmPassword) {
    status.errors.confirmPassword = 'Password must match';
    status.valid = false;
  }

  return status;
}
/**
* Validate save document
*
* @param {Object} inputFields document details
* @returns {Object} object containing the status and possible error messages
*/
export function validateSaveDocument({ title = '', access = '', content = '' }) {
  const status = validateRequiredFields([title, access, content], ['title', 'access', 'content']);

  if (access === 'null') {
    status.errors.access = 'Please choose an access control';
  }
  return status;
}
