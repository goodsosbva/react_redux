const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: [],
};

const postReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [...prevState, action.data];
    default:
      return prevState;
  }
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [addPost.pending](state, action) {},
    [addPost.fullfilled](state, action) {},
    [addPost.rejected](state, action) {},
  },
});

module.exports = postReducer;
