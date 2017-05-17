import validator from 'validator';

export function validateLogin({ username = '', password = '' }) {
  const errors = {};
  let valid = true;
  const requiredFields = ['username', 'password'];

  [username, password].forEach((field, index) => {
    if (validator.isEmpty(field)) {
      errors[requiredFields[index]] = `Please enter your ${requiredFields[index]}`;
      valid = false;
    }
  });

  return { errors, valid };
}

export function validateSignUp({ username = '', password = '', about = '', fullName = '', email = '', roleId = '' }) {
  const errors = {};
  let valid = true;
  const requiredFields = ['username', 'password', 'fullName', 'email', 'roleId'];

  [username, password, fullName, email, roleId].forEach((field, index) => {
    if (validator.isEmpty(field)) {
      errors[requiredFields[index]] = `Please enter your ${requiredFields[index]}`;
      valid = false;
    }
  });

  if (!validator.isEmail(email)) {
    errors.email = 'Please enter a valid email';
    valid = false;
  }
  if (roleId === 'null') {
    errors.roleId = 'Please choose a role';
    valid = false;
  }

  return { errors, valid };
}
