import React, { createContext, useState } from 'react';

export const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
    const [shape, setShape] = useState(""); // set default brush size to 10
    // const [rect,isRect] = useState(false);
    // const [tri,isTri] = useState(false);
    // const [cir,isCir] = useState(false);
    // const [star,isStar] = useState(false);

  return (
    <ToolContext.Provider value={{shape,setShape}} >
      {children}
    </ToolContext.Provider>
  );
};