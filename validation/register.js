const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  let errors = {};

  // If property is empty, make it to an empty string
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Strip html tags
  Object.keys(data).map(key => (data[key] = Validator.escape(data[key])));

  // Validate data
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Név megadása kötelező!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-mail cím megadása kötelező!';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Érvénytelen E-mail cím!';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Jelszó megadása kötelező!';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      'A jelszónak 6 és 30 karakter közötti hosszúságúnak kell lennie!';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'A jelszavaknak meg kell egyezniük!';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
