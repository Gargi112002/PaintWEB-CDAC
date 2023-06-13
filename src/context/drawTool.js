import React, { createContext, useState } from 'react';


export const DrawToolContext = createContext();

export const DrawToolProvider = ({ children }) => {
  
    const[draw, setDraw] = useState("Pencil")
    const [selectedDraw, setSelectedDraw] = useState("")

  return (
    <DrawToolContext.Provider value={{draw, setDraw, selectedDraw, setSelectedDraw}}>
      {children}
    </DrawToolContext.Provider>
  );
};
