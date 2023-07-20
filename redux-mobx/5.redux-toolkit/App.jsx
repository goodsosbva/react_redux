import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
const { logIn } = require("./actions/user");
const { addPost } = require("./actions/post");
const userSlice = require("./reducers/user");
const postSlice = require("./reducers/post");

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(
      logIn({
        id: "goodsosbva",
        password: "qwer1234!",
      })
    );
  }, []);

  const onLogOut = useCallback(() => {
    dispatch(userSlice.actions.logOut());
  }, []);

  const onAddPost = useCallback(() => {
    dispatch(addPost());
  });

  return (
    <div>
      {user.isLoggingIn ? (
        <div>로그인 중...</div>
      ) : user.data ? (
        <div>{user.data.nickname}</div>
      ) : (
        "로그인 해주세요~"
      )}
      {!user.data ? (
        <button onClick={onClick}>login</button>
      ) : (
        <button onClick={onLogOut}>logOut</button>
      )}
      <br />
      <button onClick={onAddPost}>게시글 작성</button>
    </div>
  );
};

export default App;
