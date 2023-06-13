import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { ToolContext } from './ToolContext';

export const BrushContext = createContext();

export const BrushProvider = ({ children }) => {
  const [brush, setBrush] = useState(""); 
  const[shape,setShape]=useState("");
  // set default brush size to 10

  return (
    <BrushContext.Provider value={{ brush, setBrush , shape,setShape }}>
      {children}
    </BrushContext.Provider>
  );
};
