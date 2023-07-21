const { observable, autorun, reaction, runInAction } = require("mobx");

const userState = observable({
  name1: "a",
  name2: "b",
  data: null,
});

const postState = observable([]);

autorun(() => {
  console.log("changed");
});

reaction(
  () => {
    return userState.data;
  },
  () => {
    console.log("reaction", userState);
  }
);

runInAction(() => {
  postState.push({ id: 1, content: "hello!" });
});

runInAction(() => {
  userState.data = {
    id: 1,
    nickname: "goodsosbva",
  };
});
