import "./canvas.css";
import React, { useRef, useState, useLayoutEffect, useContext, useEffect } from 'react';

import { ColorContext } from "../context/ColorContext";
import { PencilSizeContext } from "../context/PencilContext";
import { FillColorContext } from "../context/FillcolorContext";
import { OptionContext } from "../context/OptionContext";
import getStroke from 'perfect-freehand';
import { DrawToolContext } from "../context/drawTool";
import {ElementsContext} from "../context/ElementsContext"







const Canvas = () => {
  const { selectColor } = useContext(ColorContext)
  const { pencilSize } = useContext(PencilSizeContext);
  const { draw } = useContext(DrawToolContext)
  const {selectedOption} = useContext(OptionContext)
  const canvasRef = useRef(null);
  const [selectedElement,setSelectedElement] = useState("");
  const [action, setAction] = useState("none");
  const [rotationPoint, setRotationPoint] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);


  const isWithinElement = (x, y, element) => {
    const { type, x1, y1, x2, y2 } = element;
  
    if (type === "rect") {
      return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    } else if (type === "straightline") {
      const slope = (y2 - y1) / (x2 - x1);
      const yIntercept = y1 - slope * x1;
      const distance = Math.abs(y - slope * x - yIntercept) / Math.sqrt(slope * slope + 1);
      return distance <= 3;
    } else if (type === "cir") {
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const distance = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
      return distance <= radius;
    } else if (type === "diamond") {
      const centerX = x1 + (x2 - x1) / 2;
      const centerY = y1 + (y2 - y1) / 2;
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);
      const xDist = Math.abs(x - centerX);
      const yDist = Math.abs(y - centerY);
      return (
        (xDist / (width / 2) + yDist / (height / 2)) <= 1
      );
    } else if (type === "tri") {
      const vertices = [
        { x: x1, y: y2 },
        { x: x1 + (x2 - x1) / 2, y: y1 },
        { x: x2, y: y2 },
      ];
      let isInside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x;
        const yi = vertices[i].y;
        const xj = vertices[j].x;
        const yj = vertices[j].y;
        const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
        if (intersect) {
          isInside = !isInside;
        }
      }
      return isInside;
    }
  
    return false;
  };
  

  const getElementAtPosition = (x, y, elements) => {
    return elements.find(element => isWithinElement(x,y,element))
  };
  
  const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  // const {shape} = useContext(ToolContext);
  const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return '';

    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ['M', ...stroke[0], 'Q']
    );

    // d.push('Z');
    return d.join(' ');
  };
 
  
  
  
  const {elements, setElements, deletedElement} = useContext(ElementsContext) // state for storing elements and brush
  const [ctx, setCtx] = useState(null);


  
  useLayoutEffect(() => {
    initializeCanvas();
 
  }, [elements,deletedElement,draw]);

    
  const initializeCanvas = () => {
    // console.log("in use layout")
    const canvas = canvasRef.current;
    const newCtx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;


    newCtx.strokeStyle = selectColor;
    newCtx.fillStyle = selectColor;

    canvas.style.border = 'solid gray 0.5px';
    // newCtx.fillRect(0, 0, canvas.width, canvas.height);

    setCtx(newCtx);

    if (draw !== "Pencil" && draw !== "Calligraphybrush"&& draw !== "Marker"&& draw !== "Airbrush" && draw !== "Crayonbrush" && draw !== "Outlinebrush" && draw !== "brush3") {
      newCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }


    elements.forEach(shape => {

      newCtx.strokeStyle = shape?.color;
      newCtx.lineWidth = shape?.size;
      newCtx.fillStyle = shape.color;
      // console.log("color: "+ shape.color)
      // console.log("size: "+ shape.size)
      
    
      if (shape.type === "rect") {
      // newCtx.save(); // Save the current transformation state
      // newCtx.translate(shape.x1, shape.y1); // Move the origin to the shape's starting point
      // newCtx.rotate(rotationAngle * (Math.PI / 180)); // Rotate the canvas by the rotation angle
      // newCtx.translate(-shape.x1, -shape.y1); // Move the origin back to the original position
  
      // // ... draw the shape ...
      newCtx.beginPath();
      newCtx.strokeRect(shape.x1, shape.y1, shape.x2 - shape.x1, shape.y2 - shape.y1);
  
      newCtx.restore(); // Restore the saved transformation state
       
        
       
      } else if (shape.type === "cir") {
        newCtx.beginPath();
        const radius = Math.sqrt(Math.pow(shape.x2 - shape.x1, 2) + Math.pow(shape.y2 - shape.y1, 2));
        newCtx.arc(shape.x1, shape.y1, Math.abs(radius), 0, 2 * Math.PI);
        newCtx.stroke();
       
      }
      else if (shape?.type === "diamond") {
        newCtx.beginPath();
        newCtx.moveTo(shape.x1 + (shape.x2 - shape.x1) / 2, shape.y1);
        newCtx.lineTo(shape.x2, shape.y1 + (shape.y2 - shape.y1) / 2);
        newCtx.lineTo(shape.x1 + (shape.x2 - shape.x1) / 2, shape.y2);
        newCtx.lineTo(shape.x1, shape.y1 + (shape.y2 - shape.y1) / 2);
        newCtx.closePath();
        newCtx.stroke();
     
      } else if (shape?.type === "tri") {
        newCtx.beginPath();
        newCtx.moveTo(shape.x1 + (shape.x2 - shape.x1) / 2, shape.y1);
        newCtx.lineTo(shape.x1 + (shape.x2 - shape.x1), shape.y1 + (shape.y2 - shape.y1));
        newCtx.lineTo(shape.x1, shape.y1 + (shape.y2 - shape.y1));
        newCtx.closePath();
        newCtx.stroke();
       
      } else if (shape?.type === "straightline") {

        newCtx.beginPath();
        newCtx.moveTo(shape.x1, shape.y1);
        newCtx.lineTo(shape.x2, shape.y2);
        newCtx.stroke();

      }
      else if (shape?.type === "Pencil") {
        newCtx.beginPath();   
        const stroke = getSvgPathFromStroke(getStroke(shape.points, {
          size: 2,
          thinning: -0.45,
          smoothing: 0.29,
          streamline: 0.29,
          taper:0.3,
          
        }));
        console.log(elements)
        const myPath = new Path2D(stroke)
        // newCtx.stroke(myPath);
        newCtx.fill(myPath);
      } 
      else if (shape?.type === "Calligraphybrush") {
        
        newCtx.beginPath();
        // newCtx.lineCap = "square"
        const stroke = getSvgPathFromStroke(getStroke(shape.points, {
          //size: 20,
          size: shape.size,
          color: shape.color,
          thinning: 1.06, 
          smoothing: 0.95,
          streamline: 0.99, 

          easing: (t) => t * t * t,
        start: {
          taper: 100,
          easing: (t) => t * t * t,
        },
        end: {
          taper: 50,
          easing: (t) => t * t * t,
        },
        }));
        console.log(elements)
        const myPath = new Path2D(stroke);
        newCtx.fill(myPath);
      }
      else if (shape?.type === "Marker") {
        newCtx.globalAlpha = 0.5; // set transparency to 50%
        newCtx.beginPath();
        const stroke = getSvgPathFromStroke(getStroke(shape.points, {
          //size: 15,
          size: shape.size,
          color: shape.color,
          thinning: 0.2,
          smoothing: 0.7,
          streamline: 0.3,
          taper: 0.2,
          pressure: 0.7,
          tilt: 0.3,
          angle: 0.5,
          spacing: 0.5
        }));
        console.log(elements)
        const myPath = new Path2D(stroke);
        newCtx.fill(myPath);
        newCtx.globalAlpha = 1; // reset transparency to 100%
      }
      else if (shape?.type === "Crayonbrush") {
        newCtx.lineJoin = "round"; // Set line join to round for crayon brush
        newCtx.beginPath(); // Begin a new path
        const { points, color } = shape;
        const size = 20; // Adjust the size of the crayon brush
        const density = 150; // Adjust the density of the crayon strokes
        const opacity = 0.25; // Adjust the opacity of the strokes
        const radius = 2.4;
      
        newCtx.globalAlpha = opacity;
      
        for (let i = 0; i < points.length - 1; i++) {
          const startPoint = points[i];
          const endPoint = points[i + 1];
      
          for (let j = 0; j < density; j++) {
            const t = j / density;
            const offsetX = Math.random() * size - size / 2;
            const offsetY = Math.random() * size - size / 2;
      
            const x = startPoint.x + (endPoint.x - startPoint.x) * t + offsetX;
            const y = startPoint.y + (endPoint.y - startPoint.y) * t + offsetY;
      
            const gradient = newCtx.createRadialGradient(
              x, y, 0, x, y, radius
            );
      
            // Set the inner color to black
            gradient.addColorStop(0, 'black');
      
            // Set the outer color to the desired light color
            gradient.addColorStop(1, color);
      
            newCtx.beginPath();
            newCtx.arc(x, y, radius, 0, 2 * Math.PI);
      
            newCtx.fillStyle = gradient;
            newCtx.fill();
          }
        }
      
        newCtx.globalAlpha = 1; // Reset the global alpha to 1
      }

      // else if (shape?.type === "Watercolorbrush") {
      //   newCtx.globalAlpha = 1; // set transparency to 50%
      //   newCtx.beginPath();
      //   const stroke = getSvgPathFromStroke(getStroke(shape.points, {
      //     size: shape.size,
      //     thinning: -0.99,
      //     smoothing: 0.52,
      //     streamline: 0.1,
      //     pressure: 1,
      //     tilt: 0.3,
      //     angle: 0.5,
      //     spacing: 0.5,
      //     stroke: 0,
      //   }));
        
      //   // Define the gradient
      //   var grd = ctx.createRadialGradient(0,0,canvas.width,0,0,0);
      //   grd.addColorStop(0, "red");
      //   grd.addColorStop(1, "white");
        
      //   newCtx.fillStyle = grd
      
      //   const myPath = new Path2D(stroke);
      //   newCtx.fill(myPath);
        
      //   // newCtx.globalAlpha = 1; // reset transparency to 100%
      // }
      



if (shape?.type === "Watercolorbrush") {
  const size = 10; // Adjust the size of the stroke as desired
  
  const opacity = 0.9; // Adjust the overall opacity of the stroke
  const opacityOffset = 0.4; // Adjust the opacity offset for the middle section
  const segments = shape.points.length - 1;
  
  newCtx.globalCompositeOperation = "lighter";
  
  // Calculate the opacity for each point along the stroke
  const opacityFactor = 1 / segments;

  for (let i = 0; i < segments; i++) {
    const pointA = shape.points[i];
    const pointB = shape.points[i + 1];

    // Calculate the opacity for the current segment
    const startOpacity = opacity - opacityOffset * (i * opacityFactor);
    const endOpacity = opacity - opacityOffset * ((i + 1) * opacityFactor);

    // Create a Path2D object for the segment
    const path = new Path2D();

    // Move to the first point of the segment
    path.moveTo(pointA.x, pointA.y);

    // Draw a curve to the midpoint with control point adjustment
    const midPoint = {
      x: (pointA.x + pointB.x) / 2,
      y: (pointA.y + pointB.y) / 2
    };
    const controlPoint = {
      x: (pointA.x + midPoint.x) / 2,
      y: (pointA.y + midPoint.y) / 2
    };
    path.quadraticCurveTo(controlPoint.x, controlPoint.y, midPoint.x, midPoint.y);

    // Set the opacity for the current segment
    newCtx.globalAlpha = startOpacity;

    // Set the color for the current segment
    newCtx.strokeStyle = selectColor;

    // Draw the segment
    newCtx.lineWidth = size;
    newCtx.stroke(path);

    // Set the opacity for the next segment
    newCtx.globalAlpha = endOpacity;
  }
}

      
      
      else if (shape?.type === "Airbrush") {
        newCtx.globalAlpha = 1; // set transparency to 50%
        newCtx.beginPath();
        const stroke = getSvgPathFromStroke(getStroke(shape.points, {
        //size: 83,
        size: shape.size,
        color: shape.color,
        thinning: -0.99,
        smoothing: 0.52,
        streamline: 0.1,
        easing: (t) => t * t * t,
        start: {
          taper: 200,
          easing: (t) => t * t * t,
        },
        end: {
          taper: 20,
          easing: (t) => t * t * t,
        },
        pressure: 1,
        tilt: 0.3,
        angle: 0.5,
        spacing: 0.5,
        stroke : 0
      }));
      console.log(elements)
      const myPath = new Path2D(stroke);
      newCtx.fill(myPath);
      newCtx.globalAlpha = 1; // reset transparency to 100%
      }
    
      
     else if (shape?.type === "Outlinebrush") {
     const stroke = getStroke(shape.points, {
     size: shape.size,
     color: shape.color,
                   
     });
        
    // const outlinePoints = getStroke(shape.points, {
    // size: shape.size + 8, 
    // color: 'black', 
    //  });
        
      const strokePath = new Path2D(getSvgPathFromStroke(stroke));
      // const outlinePath = new Path2D(getSvgPathFromStroke(outlinePoints));
      
    
                  
      newCtx.fill(strokePath);
      newCtx.strokeStyle = 'black';
      newCtx.lineWidth = 4; // Set the outline width
      newCtx.stroke(strokePath)
      // newCtx.stroke(outlinePath);
                
   }
      
      
      
   else if (shape?.type === "brush3") {
  newCtx.beginPath();

  const stroke = getStroke(shape.points, {
    size: shape.size,
    color: shape.color,
    strokeDasharray: "5, 5",
  });

  const myPath = new Path2D(getSvgPathFromStroke(stroke));


  newCtx.setLineDash([5, 5]); 


  newCtx.stroke(myPath); 
}


  
    });
    

    // })

  };
  const createElement = (id, type, x1, y1, x2, y2, size = 2, color = "black",fillColor="#FFFFFF",rotation=0) => {

    if (type === "rect") {
      return { id, type, x1, y1, x2, y2, size, color,fillColor,rotation };
    } else if (type === "tri") {
      return { id, type, x1, y1, x2, y2, size, color,fillColor,rotation};
    } else if (type === "diamond") {
      return { id, type, x1, y1, x2, y2, size, color,fillColor,rotation };
    } else if (type === "cir") {
      return { id, type, x1, y1, x2, y2, size, color ,fillColor,rotation};
    } else if (type === "straightline") {
      return { id, type, x1, y1, x2, y2, size, color };
    } else if (type === "Pencil") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    } else if (type === "Calligraphybrush") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    } else if (type === "Marker") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    } else if (type === "Crayonbrush") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    } else if (type === "Airbrush") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    }else if (type === "Watercolorbrush") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    }else if (type === "Outlinebrush") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    }else if (type === "brush3") {
      return { id, type, points: [{ x: x1, y: y1 }], size, color };
    }
  };
  

  const handleMouseDown = (event) => {
    const coordinates = getCoordinates(event);
    
   if(selectedOption === "Select"){
    const element = getElementAtPosition(coordinates.x,coordinates.y,elements)
    setElements(elements.filter((ele)=> ele !== element))
    console.log(element)
    if(element){
    setAction("delete")
    }

   }
   else if(selectedOption === "Move"){
    const element = getElementAtPosition(coordinates.x,coordinates.y,elements)
    if(element){
      console.log("in moving")
      setSelectedElement(element)
      setAction("moving")
      }
  }  else if(selectedOption === "Rotate"){
    const mouseX = coordinates.x;
    const mouseY = coordinates.y;
    const element = getElementAtPosition(coordinates.x,coordinates.y,elements)
    if(element){
      console.log("in rotating")
      setSelectedElement(element)
      setAction("rotating")
      setRotationPoint({ x: mouseX, y: mouseY })
      }
  } else if(selectedOption === "FillColor"){
    const element = getElementAtPosition(coordinates.x,coordinates.y,elements)
    if(element){
      console.log("in fillcolor")
      setSelectedElement(element)
      setAction("fillcolor")
      const {type,x1,y1,x2,y2} = element
      if(element.type=== "rect"){
      ctx.beginPath();
      ctx.rect(x1,y1,x2-x1,y2-y1);
      ctx.fillStyle = selectColor;
      ctx.fill();
      }else if(element.type === "cir"){
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        ctx.arc(x1, y1, Math.abs(radius), 0, 2 * Math.PI);
        ctx.fillStyle = selectColor;
        ctx.fill();
      }else if(element.type=== "tri"){
        ctx.beginPath();
        ctx.moveTo(x1 + (x2 - x1) / 2, y1);
        ctx.lineTo(x1 + (x2 - x1), y1 + (y2 - y1));
        ctx.lineTo(x1, y1 + (y2 - y1));
       // ctx.stroke();
        ctx.fillStyle = selectColor;
        ctx.fill();
        //ctx.closePath();

      }else if(element.type === "diamond"){
        ctx.beginPath();
        ctx.moveTo(x1 + (x2 - x1) / 2, y1);
        ctx.lineTo(x2,y1 + (y2 - y1) / 2);
        ctx.lineTo(x1 + (x2 - x1) / 2, y2);
        ctx.lineTo(x1, y1 + (y2 - y1) / 2);
      
        //ctx.stroke();
        ctx.fillStyle = selectColor;
        ctx.fill();
        //ctx.closePath();
      }
     
      
      }
  }
   else{
    if (coordinates) {
      const id= elements.length;
      if (draw === "rect") {
        const coordinates = getCoordinates(event);
        
        const newShape = createElement(id, "rect", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor,selectColor);
        setElements([...elements, newShape]);
      } else if (draw === "tri") {
        const coordinates = getCoordinates(event);
        const newShape = createElement(id, "tri",coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor,selectColor);
        setElements([...elements, newShape]);
      } else if (draw === "cir") {
        const coordinates = getCoordinates(event);
        const newShape = createElement(id, "cir", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor,selectColor);
        setElements([...elements, newShape]);
      } else if (draw === "diamond") {
        const coordinates = getCoordinates(event);
        const newShape = createElement(id, "diamond", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor,selectColor);
        setElements([...elements, newShape]);
      } else if (draw === "straightline") {
        const coordinates = getCoordinates(event);
        const newShape = createElement(id, "straightline", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor);
        setElements([...elements, newShape]);
      } else if (draw === "Pencil") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Pencil", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor)
        setElements([...elements, pencilElement])
      } else if (draw === "Calligraphybrush") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Calligraphybrush", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor)
        setElements([...elements, pencilElement])
      }else if (draw === "Crayonbrush") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Crayonbrush", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor)
        setElements([...elements, pencilElement])
      }else if (draw === "Marker") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Marker", coordinates.x, coordinates.y, coordinates.x, coordinates.y, pencilSize, selectColor)
        setElements([...elements, pencilElement])
      }else if (draw === "Airbrush") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Airbrush", coordinates.x, coordinates.y, coordinates.x, coordinates.y ,pencilSize, selectColor)
        setElements([...elements, pencilElement])
      
      }else if (draw === "Watercolorbrush") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Watercolorbrush", coordinates.x, coordinates.y, coordinates.x, coordinates.y ,pencilSize, selectColor)
        setElements([...elements, pencilElement])
      
      }else if (draw === "Outlinebrush") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "Outlinebrush", coordinates.x, coordinates.y, coordinates.x, coordinates.y ,pencilSize, selectColor)
        setElements([...elements, pencilElement])
      
      }else if (draw === "brush3") {
        const coordinates = getCoordinates(event);
        const pencilElement = createElement(id, "brush3", coordinates.x, coordinates.y, coordinates.x, coordinates.y ,pencilSize, selectColor)
        setElements([...elements, pencilElement])
      
      }
      setAction("drawing")
     
    }}
  };



  const handleMouseUp = () => {
   
    setAction("none");
   //setSelectedElement(null);
  };

  const updateElement = (id, type, x1, y1, x2, y2,rotation) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element,type, x1, y1, x2, y2,rotation };
      }
      return element;
    });
    setElements(updatedElements);
  };
  
  const handleMouseMove = (event) => {
   // const newCtx = canvasRef.getContext('2d');
    const coordinates = getCoordinates(event);
    if (action === "drawing") {
      // console.log(elements)
     
      // console.log("event",event)
    
      
      if (coordinates) {
       const coordinates = getCoordinates(event);
          // console.log("draw" + draw)
          if (draw === "straightline") {
            
            const latestShape = elements[elements.length - 1];
            const updatedShape = { ...latestShape, x2: coordinates.x, y2: coordinates.y };
            const updatedShapes = [...elements.slice(0, -1), updatedShape];
            setElements(updatedShapes);
          } else if (draw === "Pencil") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];
            // {type, points: [{x: x1, y:y1}], size, color}
            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          } else if (draw === "Calligraphybrush") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          }else if (draw === "Marker") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          }else if (draw === "Airbrush") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          }else if (draw === "Crayonbrush") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          }
          else if (draw === "Watercolorbrush") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          } else if (draw === "Outlinebrush") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          } else if (draw === "brush3") {
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];

            const updated = { ...latestShape, points: [...latestShape.points, { x: coordinates.x, y: coordinates.y }] }
            const updatedShapes = [...elements.slice(0, -1), updated];
            setElements(updatedShapes);
          }
          else { 
            const coordinates = getCoordinates(event);
            const latestShape = elements[elements.length - 1];
            const updatedShape = { ...latestShape, x2: coordinates.x, y2: coordinates.y };
            const updatedShapes = [...elements.slice(0, -1), updatedShape];
            setElements(updatedShapes);
          }
          


      }
    }
    else if(action === "moving"){
    
      const {id,type,x1,y1,x2,y2}= selectedElement;
      const width = x2-x1;
      const height = y2-y1;
     updateElement(id,type,coordinates.x,coordinates.y,coordinates.x+width,coordinates.y+height) 
    }
    // if (selectedOption === "rotation") {
    //   const { offsetX, offsetY } = event.nativeEvent;
    //   const newRotationAngle = Math.atan2(offsetY - rotationPoint.y, offsetX - rotationPoint.x) * (180 / Math.PI);
    //   setRotationAngle(newRotationAngle);
    // }
    
    else if (action === "rotating") {
      const { id, type, x1, y1, x2, y2 } = selectedElement;
      const mouseX = coordinates.x;
      const mouseY = coordinates.y;
      const angle = Math.atan2(mouseY - y1, mouseX - x1);
      const rotatedX1 = Math.cos(angle) * (x1 - x1) - Math.sin(angle) * (y1 - y1) + x1;
      const rotatedY1 = Math.sin(angle) * (x1 - x1) + Math.cos(angle) * (y1 - y1) + y1;
      const rotatedX2 = Math.cos(angle) * (x2 - x1) - Math.sin(angle) * (y2 - y1) + x1;
      const rotatedY2 = Math.sin(angle) * (x2 - x1) + Math.cos(angle) * (y2 - y1) + y1;
    
      // Calculate clockwise rotation based on mouse position
      const angleDegrees = (angle * 180) / Math.PI;
      const clockwiseAngleDegrees = (angleDegrees >= 0 ? angleDegrees : (360 + angleDegrees)) % 360;
    
      // Update shape with rotated coordinates
      updateElement(id, type, rotatedX1, rotatedY1, rotatedX2, rotatedY2, clockwiseAngleDegrees);
    }
    
    
    
    

    

  
   
  };


  

  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
  };

  return (

    <div className="canvas-container">


     
      <canvas ref={canvasRef} className="responsive-canvas"

        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );

};

export default Canvas;