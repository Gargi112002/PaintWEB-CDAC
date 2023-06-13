import React, { createContext, useState } from 'react';


export const OptionContext = createContext();

export const OptionProvider = ({ children }) => {
  
    const[option, setOption] = useState("Pencil")
    const [selectedOption, setSelectedOption] = useState("")

  return (
    <OptionContext.Provider value={{option, setOption, selectedOption, setSelectedOption}}>
      {children}
    </OptionContext.Provider>
  );
};
