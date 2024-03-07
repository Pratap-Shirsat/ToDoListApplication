const formResponse = (data, error = null) => {
  return {
    Data: data,
    ErrorMessage: error,
  };
};

module.exports = {
  formResponse,
};
