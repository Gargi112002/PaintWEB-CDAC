import React ,{ useContext, useState }from 'react';
import "./Pencilsize.css";
import BlinkingText from './Blink.js';
import { PencilSizeContext } from '../context/PencilContext';

  const Pencilsize = (props) => {
    const [currentPencilSize, setCurrentPencilSize] = useState("");
    const {pencilSize, setPencilSize} = useContext(PencilSizeContext); // set default brush size to 10


    const pencilClick = (option)=>{
      switch (option) {
        case "Small":
          setCurrentPencilSize(3);
          setPencilSize(3);  // set brush size to 5 when "Small" is clicked
          break;
        case "Medium":
          setCurrentPencilSize(8);
          setPencilSize(8);  // set brush size to 10 when "Medium" is clicked
          break;
        case "Large":
          setPencilSize(12); // set brush size to 15 when "Large" is clicked
          break;
        case "Extra Large":
          setCurrentPencilSize(15);
          setPencilSize(15);  // set brush size to 20 when "Extra Large" is clicked
          break;
        default:
          setCurrentPencilSize(""); // set brush size to default when no option is selected
      }
      props.opt("Toolbox")

      // opt(option);
    }

  return (
    <div className="buttons-container"> 
        <BlinkingText colorP={<button onClick={()=>pencilClick("Small")} name="small">Small</button>} freq={100}></BlinkingText>
    
    
        <BlinkingText colorP={<button onClick={()=>pencilClick("Medium")} name="medium">Medium</button>} freq={200}></BlinkingText>
      
    
        <BlinkingText colorP={<button onClick={()=>pencilClick("Large")} name ="large">Large</button>} freq={300}>
         
        </BlinkingText>
     
     
        <BlinkingText colorP={<button onClick={()=>pencilClick("Extra Large")} name="extralarge">Extra Large</button>} freq={400}></BlinkingText>      
        <div className="brush-size-indicator" style={{ width: currentPencilSize, height: currentPencilSize, borderRadius: currentPencilSize / 2 }}></div>
        <div
                className="selection"
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <p>Selected Option - </p>
                <input type="text" 
                    style={{ width: "50%" , maringBottom : "10px" }}
                    value={currentPencilSize}
                    readOnly/>
            </div>
    </div>
    

  );
};

export default Pencilsize;
