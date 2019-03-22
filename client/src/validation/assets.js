export default (page, limit) => {
  if (!page || !limit) {
    return false;
  }
  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit)) {
    return false;
  }

  return true
};
