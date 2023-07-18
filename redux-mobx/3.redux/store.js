const { createStore, applyMiddleware, compose } = require("redux");
const reducer = require("./reducers");
const { composeWithDevTools } = require("redux-devtools-extension");

const { addPost } = require("./actions/post");
const { logIn, logOut } = require("./actions/user");

const initialState = {
  user: {
    isLogginIn: false,
    data: null,
  },
  posts: [],
};

// 함수들이 여러번 중첩되어 있는것
const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("액션 로깅", action);
  dispatch(action);
  console.log("액션 끝");
};

const thunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    // 비동기
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(reducer, initialState, enhancer);

module.exports = store;
