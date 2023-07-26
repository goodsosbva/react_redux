const initialState = {
  isLogginIn: false,
  data: null,
};

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...prevState,
        isLogginIn: true,
      };

    case LOG_IN_SUCCESS:
      return {
        ...prevState,
        isLogginIn: false,
        data: action.data,
      };

    case LOG_IN_FAILURE:
      return {
        ...prevState,
        isLogginIn: false,
        data: null,
      };

    case "LOG_OUT":
      return {
        isLogginIn: false,
        user: null,
      };

    default:
      return prevState;
  }
};

module.exports = userReducer;
