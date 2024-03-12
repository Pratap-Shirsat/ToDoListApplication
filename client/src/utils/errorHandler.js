export const formErrorResponse = (error) => {
  const errorRes = {
    tokenExpired: false,
    errMsg: "",
  };
  switch (error.response.status) {
    case 403:
      errorRes.tokenExpired = true;
      errorRes.errMsg = error.response.data.ErrorMessage;
      break;
    case 400:
      const { ErrorMessage } = error.response.data;
      if (Array.isArray(ErrorMessage))
        errorRes.errMsg = ErrorMessage.map((err) => err.msg).join(", ");
      else errorRes.errMsg = ErrorMessage;
      break;
    case 404:
      errorRes.errMsg = error.response.data.ErrorMessage;
      break;
    default:
      errorRes.errMsg = "Some error occured at server";
  }
  return errorRes;
};
