const { createAsyncThunk } = require("@reduxjs/toolkit");

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  // pending, fullfilled, rejected
  console.log(data);
  const result = await delay(500, {
    userId: 1,
    nickname: "goodsosbva",
  });
  return result;
});

// async action creator
const oldlogIn = (data) => {
  return (dispatch, getState) => {
    // async action
    dispatch(logInRequest());

    try {
      setTimeout(() => {
        dispatch(
          logInSuccess({
            userId: 1,
            nickname: "khszzang!",
          })
        );
      }, 2000);
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

const logInRequest = () => {
  return {
    type: "LOG_IN_REQUEST",
    data: {
      id: "khs",
      password: "qwer123!",
    },
  };
};

const logInSuccess = (data) => {
  return {
    type: "LOG_IN_SUCCESS",
    data,
  };
};

const logInFailure = (error) => {
  return {
    type: "LOG_IN_SUCCESS",
    error,
  };
};

// // sync action creater
// const login = (data) => {
//   return {
//     type: "LOG_IN",
//     data,
//   };
// };

// const logOut = () => {
//   return {
//     type: "LOG_OUT",
//   };
// };

module.exports = {
  logIn,
};
