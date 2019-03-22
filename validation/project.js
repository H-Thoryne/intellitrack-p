const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateProjectInput = data => {
  let errors = {};

  // If property is empty, make it to an empty string
  data.longitude = !isEmpty(data.longitude) ? Number(Validator.escape(data.longitude.toString())) : -1;
  data.latitude = !isEmpty(data.latitude) ? Number(Validator.escape(data.latitude.toString())) : -1;
  data.projectName = !isEmpty(data.projectName) ? Validator.escape(data.projectName) : "";
  data.address = !isEmpty(data.address) ? Validator.escape(data.address) : "";
  data.radius = !isEmpty(data.radius) ? parseInt(Validator.escape(data.radius.toString())) : -1;

  if (isNaN(data.longitude)) {
    errors.longitude = "Érvénytelen hosszúsági koordináta!";
  }

  if (isNaN(data.latitude)) {
    errors.latitude = "Érvénytelen szélességi koordináta!";
  }

  if (Validator.isEmpty(data.projectName)) {
    errors.projectName = "Projekt név megadása kötelező!";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "Cím megadása kötelező!";
  }
  if (isNaN(data.radius)) {
    errors.radius = "Terület sugarának megadása kötelező!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProjectInput;
