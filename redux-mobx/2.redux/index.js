const { createStore, applyMiddleware, compose } = require("redux");
const reducer = require("./reducers");
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

const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);

const store = createStore(reducer, initialState, enhancer);

console.log(store.getState());

// store -> dispatch
store.dispatch(
  logIn({
    id: 1,
    name: "goodsosbva",
    admin: true,
  })
);

// store.dispatch(
//   addPost({
//     id: 1,
//     title: "리듀서 이제 이해가는듯",
//     content: "ㅈㄱㄴ",
//   })
// );

// store.dispatch(
//   addPost({
//     id: 2,
//     title: "리듀서 확인 사살 가즈아~",
//     content: "확실하게 알아두자고~ 다음은 모벡스 너야~",
//   })
// );

// store.dispatch(logOut());

// console.log(store.getState());
