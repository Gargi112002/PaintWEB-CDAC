import React ,{ useContext, useState }from 'react';
import "./Pencilsize.css";
import BlinkingText from './Blink.js';
import { BrushContext } from '../context/BrushContext';
import { DrawToolContext } from '../context/drawTool';

  const Brush = (props) => {
    // const [currentBrush, setCurrentBrush] = useState("");
    const {brush, setBrush} = useContext(BrushContext); // set default brush size to 10
    const {setDraw} = useContext(DrawToolContext)

    const brushClick = (option)=>{
      setDraw(option)
      switch (option) {
        case "Marker":
          setBrush("Marker"); 

          break;
        case "Calligraphybrush":
          setBrush("Calligraphybrush");
 
          break;
        case "Crayonbrush":
          setBrush("Crayonbrush");

          break;
        case "Airbrush":
          setBrush("Airbrush");
   
          break;
          case "Watercolorbrush":
          setBrush("Watercolorbrush");
   
          break;
          case "Outlinebrush":
          setBrush("Outlinebrush");
   


        default:
          // setBrush("");
         
      }
      props.opt("Toolbox")

      // opt(option);
    }

  return (
    <div className="buttons-container"> 
        <BlinkingText colorP={<button onClick={()=>brushClick("Marker")} name="marker">Marker</button>} freq={300}></BlinkingText>
    
    
        <BlinkingText colorP={<button onClick={()=>brushClick("Calligraphybrush")} name="calligraphybrush">Calligraphybrush</button>} freq={2000}></BlinkingText>
      
    
        <BlinkingText colorP={<button onClick={()=>brushClick("Crayonbrush")} name ="crayonbrush">Crayonbrush</button>} freq={300}>
         
        </BlinkingText>
        <BlinkingText colorP={<button onClick={()=>brushClick("Watercolorbrush")} name ="watercolorbrush">Watercolorbrush</button>} freq={300}> </BlinkingText>
        <BlinkingText colorP={<button onClick={()=>brushClick("Outlinebrush")} name ="Outlinebrush">Outlinebrush</button>} freq={300}> </BlinkingText>
      
        <BlinkingText colorP={<button onClick={()=>brushClick("Airbrush")} name="airbrush">Airbrush</button>} freq={400}></BlinkingText>      
        <div className="brush-size-indicator" style={{ width: brush, height: brush, borderRadius: brush / 2 }}></div>
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
                    value={setBrush}
                    readOnly/>
            </div>
    </div>
    

  );
};

export default Brush;