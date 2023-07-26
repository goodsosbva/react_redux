const { observable, action } = require("mobx");

const userStore = observable({
  isLoggingIn: false,
  data: null,
  logIn(data) {
    this.isLoggingIn = true;
    setTimeout(
      action(() => {
        this.data = data;
        this.isLoggingIn = false;
        postStore.data.push(1); // redux 비해 편함
      }),
      2000
    );
  },
  logOut() {
    this.data = null;
  },
});

const postStore = observable({
  data: [],
  addPost(data) {
    this.data.push(data);
  },
  // computed
  get postLength() {
    return this.data.length;
  },
});

export { userStore, postStore };
