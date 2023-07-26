import React, { Component, useCallback } from "react";
import { observable } from "mobx";
import { useObserver, useLocalStore } from "mobx-react";
import { userStore, postStore } from "./store";
import useStore from "./useStore";

const App = () => {
  const { userStore, postStore } = useStore();

  const state = useLocalStore(() => ({
    name: "",
    password: "",
    onChangeName(e) {
      this.name = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    },
  }));

  const onLogIn = useCallback(() => {
    userStore.logIn({
      nickName: "goodsosbva",
      password: "qwer1234!",
    });
  }, []);

  const onLogOut = useCallback(() => {
    userStore.logOut();
  }, []);

  return useObserver(() => (
    <div>
      {userStore.isLoggingIn ? (
        <div>로그인 중</div>
      ) : userStore.data ? (
        <div>{userStore.data.nickname}</div>
      ) : (
        "로그인 해주세요."
      )}
      {!userStore.data ? (
        <button onClick={onLogIn}>로그인</button>
      ) : (
        <button onClick={onLogOut}>로그아웃</button>
      )}
      <div>{postStore.data.length}</div>
      <input value={this.state.name} onChange={this.onChangeName} />
      <input
        value={this.state.password}
        type="password"
        onChange={this.onChangePassword}
      />
    </div>
  ));
};

export default observer(App);
