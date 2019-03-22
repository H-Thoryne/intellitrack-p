import { GET_ERRORS, RESET_ERRORS } from './types';

export const getErrors = errors => ({
  type: GET_ERRORS,
  payload: errors
});

export const resetErrors = () => ({
  type: RESET_ERRORS
});
