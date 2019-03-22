const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateLocationInput = data => {
  let errors = {};

  // If property is empty, make it to an empty string
  data.longitude = !isEmpty(data.longitude) ? data.longitude : "";
  data.latitude = !isEmpty(data.latitude) ? data.latitude : "";
  data.assetId = !isEmpty(data.assetId) ? data.assetId : "";

  // Validate data
  Validator.escape(data.longitude);
  Validator.escape(data.latitude);
  Validator.escape(data.assetId);

  if (Validator.isEmpty(data.longitude) || !Validator.isNumeric(data.longitude)) {
    errors.longitude = "Érvénytelen hosszúsági koordináta!";
  }

  if (Validator.isEmpty(data.latitude) || !Validator.isNumeric(data.latitude)) {
    errors.latitude = "Érvénytelen szélességi koordináta!";
  }

  if (Validator.isEmpty(data.assetId)) {
    errors.assetId = "Eszköz azonosító megadása kötelező!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLocationInput;
