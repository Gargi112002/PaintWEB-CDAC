import React, { createContext, useState } from 'react';


export const ElementsContext = createContext();

export const ElementsProvider = ({ children }) => {
  
    const [elements, setElements] = useState([]);
    const [deletedElement, setDeletedElement] = useState([]);

  return (
    <ElementsContext.Provider value={{elements, setElements, deletedElement, setDeletedElement}}>
      {children}
    </ElementsContext.Provider>
  );
};
