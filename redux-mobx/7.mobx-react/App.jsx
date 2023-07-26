import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { userStore, postStore } from "./store";

class App extends Component {
  state = observable({
    name: "",
    password: "",
  });

  onLogIn = () => {
    userStore.logIn({
      nickName: "goodsosbva",
      password: "qwer1234!",
    });
  };

  onLogout = () => {
    userStore.logOut();
  };

  onChangeName = (e) => {
    this.state.name = e.target.value;
  };

  onChangePassword = (e) => {
    this.state.password = e.target.value;
  };

  render() {
    return (
      <div>
        {userStore.isLoggingIn ? (
          <div>로그인 중</div>
        ) : userStore.data ? (
          <div>{userStore.data.nickname}</div>
        ) : (
          "로그인 해주세요."
        )}
        {!userStore.data ? (
          <button onClick={this.onLogIn}>로그인</button>
        ) : (
          <button onClick={this.onLogout}>로그아웃</button>
        )}
        <div>{postStore.postLength}</div>
        <input value={this.state.name} onChange={this.onChangeName} />
        <input
          value={this.state.password}
          type="password"
          onChange={this.onChangePassword}
        />
      </div>
    );
  }
}

export default observer(App);
