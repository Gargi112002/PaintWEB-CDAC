import React, { createContext, useState } from "react";

export const FillColorContext = createContext(null);

export const FillColorProvider = ({ children }) => {
  const [fillColor, setFillColor] = useState("#ffffff");

  return (
    <FillColorContext.Provider value={{ fillColor, setFillColor }}>
      {children}
    </FillColorContext.Provider>
  );
};
