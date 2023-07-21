const { createAsyncThunk } = require("@reduxjs/toolkit");

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

const oldaddPost = (data) => {
  return {
    type: "ADD_POST",
    data,
  };
};

const addPost = createAsyncThunk("post/addPost", async (data, thunkAPI) => {
  console.log(data);
  const result = await delay(500, {
    id: 1,
    title: "helloWorld!",
    content: "helloWorld this is new world~",
  });
  return result;
});

module.exports = {
  addPost,
};
