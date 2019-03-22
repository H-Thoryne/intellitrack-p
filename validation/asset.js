const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateAssetInput = data => {
  let errors = {};

  // YYYY-MM-DD Pattern
  const datePattern = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  // If property is empty, make it to an empty string
  data.manufacturer = !isEmpty(data.manufacturer) ? data.manufacturer : '';
  data.model = !isEmpty(data.model) ? data.model : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : '';
  data.dateBuy = !isEmpty(data.dateBuy) ? data.dateBuy : '';
  data.companyId = !isEmpty(data.companyId) ? data.companyId : '';
  data.serialNumber = !isEmpty(data.serialNumber) ? data.serialNumber : '';

  // Validate data
  if (Validator.isEmpty(data.manufacturer)) {
    errors.manufacturer = 'Kötelező gyártót megadni!';
  }

  if (Validator.isEmpty(data.model)) {
    errors.model = 'Kötelező modellt megadni!';
  }

  if (!Validator.isEmpty(data.imgUrl) && !Validator.isURL(data.imgUrl)) {
    errors.imgUrl = 'Érvénytelen formátumú hivatkozás!';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Kötelező típust megadni!';
  }

  if (!Validator.matches(data.dateBuy, datePattern)) {
    errors.dateBuy = 'Érvénytelen vásárlási dátum';
  }

  if (Validator.isEmpty(data.companyId)) {
    errors.companyId = 'Leltári szám megadása kötelező!';
  }

  if (Validator.isEmpty(data.serialNumber)) {
    errors.serialNumber = 'Sorozatszám megadása kötelező!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateAssetInput;
