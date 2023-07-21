const { createSlice } = require("@reduxjs/toolkit");
const { logIn } = require("../actions/user");

const initialState = {
  isLoggingIn: false,
  data: null,
  prices: Array(100)
    .fill()
    .map((v, i) => (i + 1) * 100),
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        user: action.data,
      };

    case "LOG_OUT":
      return {
        ...prevState,
        user: null,
      };

    default:
      return prevState;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  extraReducers: {
    [logIn.pending](state, action) {
      state.isLoggingIn = true;
    },
    [logIn.fulfilled](state, action) {
      state.isLoggingIn = false;
      state.data = action.payload;
    },
    [logIn.rejected](state, action) {
      state.data = null;
      state.isLoggingIn = false;
    },
  },
});

module.exports = userSlice;
