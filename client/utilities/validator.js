import validator from 'validator';

function validateRequiredFields(inputFields = [], requiredFields = []) {
  const errors = {};
  let valid = true;
  inputFields.forEach((field, index) => {
    if (validator.isEmpty(field)) {
      errors[requiredFields[index]] = `Please enter your ${requiredFields[index]}`;
      valid = false;
    }
  });
  return { errors, valid };
}

export function validateLogin({ username = '', password = '' }) {
  return validateRequiredFields([username, password], ['username', 'password']);
}

export function validateSignUp({ username = '', password = '', about = '', fullName = '', email = '', roleId = '' }) {
  const status = validateRequiredFields(
    [username, password, fullName, email, roleId],
    ['username', 'password', 'fullName', 'email', 'roleId']);

  if (!validator.isEmail(email)) {
    status.errors.email = 'Please enter a valid email';
    status.valid = false;
  }
  if (roleId === 'null') {
    status.errors.roleId = 'Please choose a role';
    status.valid = false;
  }

  return status;
}

export function validateSaveDocument({ title = '', access = '', content = '' }) {
  const status = validateRequiredFields([title, access, content], ['title', 'access', 'content']);

  if (access === 'null') {
    status.errors.access = 'Please choose an access control';
  }
  return status;
}
