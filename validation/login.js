const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  let errors = {};

  // If property is empty, make it to an empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Strip html tags
  Object.keys(data).map(key => (data[key] = Validator.escape(data[key])));

  // Validate data
  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-mail mező kitöltése kötelező!';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Érvénytelen E-mail cím';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Jelszó megadása kötelező';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
