import {  FaCircle, FaSquare } from 'react-icons/fa';
import { BsTriangleFill, BsFillDiamondFill } from 'react-icons/bs'
import {AiOutlineLine} from 'react-icons/ai'
import React, { useState, useContext } from 'react';
import BlinkingText from "./Blink.js";
import { ToolContext } from '../context/ToolContext.js';
import { DrawToolContext } from '../context/drawTool.js';

const Tool = (props) => {
  // const {shape, setShape} = useContext(ToolContext); 

  const { shape, setShape } = useContext(ToolContext)
  const { setDraw } = useContext(DrawToolContext)
  const handle = (option) => {
    // props?.shape(shapes)
    switch (option) {
      case "Rectangle":
        setShape('rect')
        setDraw('rect')
        break;
      case "Circle":
        setShape('cir')
        setDraw('cir')
        break;
      case "Triangle":
        setShape('tri')
        setDraw('tri')
        break;
      case "Diamond":
        setShape('diamond')
        setDraw('diamond')
        // setCurrentEraserSize(120);
        // setEraserSize(120);  // set brush size to 20 when "Extra Large" is clicked
        break;
        case "straightline":
          setShape('straightline')
          setDraw('straightline')
      default:
      //   setCurrentEraserSize(""); // set brush size to default when no option is selected
    }
    props.opt("Toolbox")
  }

  return (
    <div className="buttons-container">
      {/* <div className="heading">Select Options</div> */}

      <BlinkingText colorP={<button onClick={() => { handle("Rectangle") }} name="rectangle" >Rectangle<FaSquare /> </button>} freq={500}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => { handle("Circle") }} name="circle" >Circle<FaCircle /> </button>} freq={700}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => handle("Triangle")} name="triangle" >Triangle<BsTriangleFill /> </button>} freq={500}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => handle("Diamond")} name="diamond" >Diamond<BsFillDiamondFill /> </button>} freq={150}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => handle("straightline")} name="line" >Line<AiOutlineLine /> </button>} freq={650}></BlinkingText>
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
          style={{ width: "50%", maringBottom: "10px" }}
          // value={shape}
          readOnly />
      </div>
    </div>

  );
};
export default Tool;