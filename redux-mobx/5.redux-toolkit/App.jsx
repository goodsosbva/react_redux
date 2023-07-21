import React, { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const { logIn } = require("./actions/user");
const { addPost } = require("./actions/post");
const userSlice = require("./reducers/user");

const priceSelector = (state) => state.user.prices;
const sumPriceSelector = createSelector(priceSelector, (prices) =>
  prices.reduce((a, c) => a + c, 0)
);

const App = () => {
  const user = useSelector((state) => state.user);
  const totalPrices = useSelector(sumPriceSelector);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

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

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
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
      <div>prices: {totalPrice}</div>
      <input type="email" value={email} onChange={onChangeEmail}></input>
      <br />
      <button onClick={onAddPost}>게시글 작성</button>
    </div>
  );
};

export default App;
