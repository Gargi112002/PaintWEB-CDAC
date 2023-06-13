import React, { useContext } from "react";
import { FillColorContext } from "../context/FillcolorContext";

const FillColorButton = () => {
  const { fillColor } = useContext(FillColorContext);

  const handleFill = (canvas, context) => {
    context.fillStyle = fillColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <button onClick={() => handleFill(canvasRef.current, contextRef.current)}>
      Fill Color
    </button>
  );
};

export default FillColorButton;