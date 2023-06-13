import { FaPencilAlt, FaEraser, FaTools, FaPaintBrush, FaMagic, FaFill,FaExpand} from 'react-icons/fa';

import React, { useState, useContext } from 'react';

import "./Toolbox.css";
import BlinkingText from "./Blink.js";

import { OptionContext } from '../context/OptionContext';
import { DrawToolContext } from '../context/drawTool';
import {ElementsContext} from "../context/ElementsContext"


const Toolbox = ({ opt }) => {

  

  const {setSelectedOption} = useContext(OptionContext);
  const {setSelectedDraw, setDraw}= useContext(DrawToolContext);
  const {elements, setElements, deletedElement, setDeletedElement} = useContext(ElementsContext)

  const undo = () => {
    if (elements.length === 0) return;
    const deleted = elements.pop()
    setDeletedElement((val)=>[...val,deleted])
  };
  

  const redo = () => {
    if (deletedElement.length === 0) return;
    const retrive = deletedElement.pop()
    setElements((val)=>[...val,retrive])
  };

  return (
    <>
          {/* <div className="heading">Select Options</div> */}

    <div className="buttons-container">
      <BlinkingText colorP={<button onClick={() => {opt("Select"); setSelectedOption("Select")}} name="select">Delete<FaMagic /></button>} freq={300}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => {opt("Undo"); undo()}} name="undo">Undo<FaMagic /></button>} freq={300}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => {opt("Redo"); redo()}} name="redo">Redo<FaMagic /></button>} freq={300}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => {opt("Brush"); setSelectedOption("Brush"); setSelectedDraw("Brush") }}>Brush<FaPaintBrush /></button>} freq={300}> </BlinkingText>
      <BlinkingText colorP={<button onClick={() => {opt("Rotate"); setSelectedOption("Rotate")}} name="rotate">Rotate<FaMagic /></button>} freq={300}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => { opt("Move"); setSelectedOption("Move") ; }} name="move">Move <FaEraser /></button>} freq={1000}></BlinkingText>



      <BlinkingText colorP={<button onClick={() => { opt("Pencil"); setSelectedOption("Pencil") ; setDraw("Pencil")}}>Pencil<FaPencilAlt /></button>} freq={1000}></BlinkingText>
      <BlinkingText colorP={<button onClick={() => { opt("Size"); setSelectedOption("Size") ; }}>Size<FaExpand /></button>} freq={1000}></BlinkingText>


      <BlinkingText colorP={<button onClick={() => {opt("FillColor"); setSelectedOption("FillColor")}}>FillColor<FaFill /></button>} freq={400}></BlinkingText>


      <BlinkingText colorP={<button onClick={() => {opt("Shape"); setSelectedOption("Shape") }} name="shape" >Shapes<FaTools /> </button>} freq={500}></BlinkingText>

      <BlinkingText colorP={<button onClick={() => {opt("Color"); setSelectedOption("Color")}} name="color">Color<FaMagic /></button>} freq={600}></BlinkingText>
      
      <BlinkingText colorP={<button onClick={() => {opt("Save"); setSelectedOption("Save")}} name="save">Save<FaMagic /></button>} freq={600}></BlinkingText>
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
          value={opt}
          readOnly />
      </div>
    </div>
    </>
  );
};

export default Toolbox;

