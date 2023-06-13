import React, { createContext, useState } from 'react';

export const DragContext = createContext();

export const DragProvider = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStartDrag = () => {
    setIsDragging(true);
  };

  const handleStopDrag = () => {
    setIsDragging(false);
  };

  const handleDrag = (event) => {
    if (isDragging) {
      const newPosition = {
        x: event.clientX,
        y: event.clientY
      };
      setPosition(newPosition);
    }
  };

  return (
    <DragContext.Provider
      value={{
        isDragging,
        position,
        handleStartDrag,
        handleStopDrag,
        handleDrag
      }}
    >
      {props.children}
    </DragContext.Provider>
  );
};