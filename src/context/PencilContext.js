import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { ToolContext } from './ToolContext';

export const PencilSizeContext = createContext();

export const PencilSizeProvider = ({ children }) => {
  const [pencilSize, setPencilSize] = useState(5); 
  const[shape,setShape]=useState("");
  // set default brush size to 10

  return (
    <PencilSizeContext.Provider value={{ pencilSize, setPencilSize , shape,setShape }}>
      {children}
    </PencilSizeContext.Provider>
  );
};
