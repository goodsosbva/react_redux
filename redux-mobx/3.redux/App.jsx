import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
const { logIn, logOut } = require("./actions/user");

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
    dispatch(logOut());
  }, []);

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
    </div>
  );
};

export default App;
