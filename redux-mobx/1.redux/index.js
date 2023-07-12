const { createStore } = require("redux");

const reducer = (prevState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        user: action.data,
      };

    case "ADD_POST": {
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };
    }

    case "LOG_OUT":
      return {
        ...prevState,
        user: null,
      };

    default:
      return prevState;
  }
};

const initialState = {
  user: null,
  posts: [],
};

const store = createStore(reducer, initialState);

console.log(store.getState());

// action
const login = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

const addPost = (data) => {
  return {
    type: "ADD_POST",
    data,
  };
};

// store -> dispatch
store.dispatch(
  login({
    id: 1,
    name: "goodsosbva",
    admin: true,
  })
);

store.dispatch(
  addPost({
    id: 1,
    title: "리듀서 이제 이해가는듯",
    content: "ㅈㄱㄴ",
  })
);

store.dispatch(
  addPost({
    id: 2,
    title: "리듀서 확인 사살 가즈아~",
    content: "확실하게 알아두자고~ 다음은 모벡스 너야~",
  })
);

store.dispatch(logOut());

console.log(store.getState());
