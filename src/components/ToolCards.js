import React,{useState, useEffect, useContext} from 'react';
import Toolbox from './Toolbox';
import Palette from './Palette';
import Pencilsize from './Pencilsize';

import Tool from './Tool';
import Brush from './Brush';
import { ToolContext } from '../context/ToolContext';
import { FillColorContext } from '../context/FillcolorContext';
import {OptionContext} from "../context/OptionContext"


const ToolCards =(props)=>{

    const [option, setOption] = useState("Toolbox");


    
    const {shape, setShape} = useContext(ToolContext)

    const {fillColor, setFillColor} = useContext(FillColorContext)

    const optContext = useContext(OptionContext)


    const opt = (option)=>{
        console.log(option)
        setOption(option)
        optContext.setOption(option)
        
       
        // if(option != "Eraser"){
        //     setIsErasing(false)
        // }
    }

    // useEffect(()=>{

    // },[option])
    
    if(option === "Toolbox"){
        return(
            <Toolbox opt={opt} />
            )
    }
    else if(option === "Color"){
        return(
            
            <Palette opt={opt} />
            )
            
    }
    else if(option === "Size"){
        setShape("")
        return(
            <Pencilsize opt={opt}/>
        )
    }
    else if(option === "Brush"){
        setShape("")
        return(
            <Brush opt={opt}/>
        )
    }
    else if(option === "Select"){
        return(
            <Toolbox opt={opt}/>
        )
    }else if(option === "Shape"){
        return(
            <Tool opt={opt}/>
        )
    }
    else if(option === "FillColor"){
        return(
            <Palette opt={opt} />
            )
            
    }else if(option === "Undo" || option === "Redo"|| option ==="Pencil" || option === "Move"|| option === "Rotate" || option === "Save"){
        return(
            <Toolbox opt={opt}/>
        )
    }
    

    }
export default ToolCards;