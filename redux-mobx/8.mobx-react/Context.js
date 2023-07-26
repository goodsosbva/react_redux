import React from "react";
import { userStore, postStore } from "./store";

export const storeContext = React.createContext({
  userStore,
  postStore,
});

export const storeProvider = ({ child }) => {
  return <storeContext.Provider>{child}</storeContext.Provider>;
};

export default storeProvider;
