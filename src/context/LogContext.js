import React, { createContext, useState } from "react";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== undefined ? true : false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LogContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LogContext.Provider>
  );
};
