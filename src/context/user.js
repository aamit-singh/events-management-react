import React, { createContext, useReducer } from "react";
import { reducer } from "./userReducer";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, null);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
