import React, { createContext, useState } from "react";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [selectColor, setSelected] = useState("#000000"); // default color is black

  return (
    <ColorContext.Provider value={{ selectColor, setSelected }}>
    {/* <ColorContext.Provider> */}
      {children}
    </ColorContext.Provider>
  );
};