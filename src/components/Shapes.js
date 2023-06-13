// const startDrawingRectangle = (nativeEvent) => {
//     // const {canvasOffSetX,canvasOffSetY } = nativeEvent;
//     if (!contextRef.current) console.log("erreur startDrawing Rect")

//         console.log("canvasOffset",canvasOffSetX)
//         console.log("StartX",startX)
//      contextRef.current.beginPath();
//      startX.current = nativeEvent.clientX - canvasOffSetX.current;
//      startY.current = nativeEvent.clientY - canvasOffSetY.current;
//      setIsDrawing(true);
//      nativeEvent.preventDefault();
//      nativeEvent.stopPropagation();
//  };

//  const drawRectangle = (nativeEvent) => {
//      if(!isDrawing) 
//      return;
//  console.log("drawing rect")
//      console.log(contextRef)
//     //  nativeEvent.preventDefault();
//     //  nativeEvent.stopPropagation();

//      const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
//      const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

//      const rectWidht = newMouseX - startX.current;
//      const rectHeight = newMouseY - startY.current;

//      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//      contextRef.current.strokeRect(startX.current, startY.current, rectWidht, rectHeight);
//  };

//  const stopDrawingRectangle = () => {
//     if (!contextRef.current) console.log("erreur finishDrawing")
//     contextRef.current.closePath();
//      setIsDrawing(false);
//  };
// // // const _created = e => console.log(e);
// const startDrawingTriangle =(nativeEvent) => {

//     console.log(nativeEvent)
//     nativeEvent.preventDefault();
//     nativeEvent.stopPropagation();
//      const {canvasOffSetX,canvasOffSetY } = nativeEvent;
//     // startX.current = nativeEvent.clientX - canvasOffSetX.current;
//     // startY.current = nativeEvent.clientY - canvasOffSetY.current;
    
//    setIsDrawing(true);

//     // if(lastPoint = { x: nativeEvent.canvasOffSetX, y: nativeEvent.OffSetY })
//     // console.log("lpt",lastPoint)
//     // {
//     //      drawTriangle
//     //}
//    var lastPoint = { x: nativeEvent.offsetX, y: nativeEvent.offsetY};
//    console.log(lastPoint)
//    setlastPoint(lastPoint)
//    var startPoint = lastPoint;  
// }


// const drawTriangle = (nativeEvent) => {
//     if (!isDrawing) {
//         return;
//     }
//     // startX.current = nativeEvent.clientX - canvasOffSetX.current;
//     // startY.current = nativeEvent.clientY - canvasOffSetY.current;
//     var mx = nativeEvent.offsetX;
//     var my = nativeEvent.offsetY;
//     console.log(mx, my)
//     contextRef.current.clearRect(0,0,contextRef.current.canvas.width , contextRef.current.canvas.width);
//     var twidth = Math.abs(mx - lastPoint.x) ;
//    var theight = Math.abs(my - lastPoint.y) ;

//     contextRef.current.beginPath()
//     // contextRef.current.moveTo(75, 25
//     // contextRef.current.lineTo(100, 75)
//     // contextRef.current.lineTo(100, 25)
//     // contextRef.current.lineTo(75, 25)
//     // contextRef.current.stroke()
//     // contextRef.current.closePath()

//     // contextRef.current.moveTo(mx, my );
//     // contextRef.current.lineTo(mx, my);
//     // contextRef.current.moveTo(mx-(2*twidth), my );
//     // contextRef.current.lineTo(mx, my);
//     // contextRef.current.moveTo(mx, my );
//     // contextRef.current.lineTo(mx-(2*twidth), my );
   
//     // contextRef.current.beginPath();
//     // contextRef.lineWidth = 3;
//     // contextRef.lineJoin = contextRef.lineCap = 'round';
//      contextRef.current.setLineDash([0, 0]);
//      contextRef.current.globalAlpha = 1.0;


//     // // if ( mx >= startPoint.x ) {
//     //     contextRef.current.moveTo(lastPoint.x, lastPoint.y );
//     //     contextRef.current.lineTo(mx, my);
//     //     contextRef.current.moveTo(mx-(2*twidth), my );
//     //     contextRef.current.lineTo(mx, my);
//     //     contextRef.current.moveTo(lastPoint.x, lastPoint.y );
//     //     contextRef.current.lineTo(mx-(2*twidth), my );
//     //  } else {
//     //     contextRef.moveTo(startPoint.x, startPoint.y );
//     //     contextRef.lineTo(mx, my);
//     //     contextRef.moveTo(mx+(2*twidth), my );
//     //     contextRef.lineTo(mx, my);
//     //     contextRef.moveTo(startPoint.x, startPoint.y );
//     //     contextRef.lineTo(mx+(2*twidth), my );
//     //  }


//     if ( mx >= lastPoint.x ) {
//         contextRef.current.moveTo(lastPoint.x, lastPoint.y );
//         contextRef.current.lineTo(mx, my);
//         contextRef.current.moveTo(mx-(2*twidth), my );
//         contextRef.current.lineTo(mx, my);
//         contextRef.current.moveTo(lastPoint.x, lastPoint.y );
//         contextRef.current.lineTo(mx-(2*twidth), my );
//      } else {
//         contextRef.current.moveTo(lastPoint.x, lastPoint.y );
//         contextRef.current.lineTo(mx, my);
//         contextRef.current.moveTo(mx+(2*twidth), my );
//         contextRef.current.lineTo(mx, my);
//         contextRef.current.moveTo(lastPoint.x, lastPoint.y );
//         contextRef.current.lineTo(mx+(2*twidth), my );
//      }
  
//     // contextRef.current.closePath();
//      //contextRef.current.strokeStyle ;
//      contextRef.current.stroke();
// // contextRef.current.moveTo(startX + (canvasOffSetX - startX) / 2, startY);
// // contextRef.current.lineTo(startX, canvasOffSetY);
// // contextRef.current.lineTo(canvasOffSetX, canvasOffSetY);
// // contextRef.current.lineTo(startX + (canvasOffSetX - startX) / 2,startY);

// // contextRef.current.stroke();
// // contextRef.current.closePath();

     
// //contextRef.current.fill();


//     // nativeEvent.preventDefault();
//     // nativeEvent.stopPropagation();

//     // const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
//     //  const newMouseY = nativeEvent.clientY - canvasOffSetY.current;

//     //  const trione = newMouseX - startX.current;
//     //  const tritwo = newMouseX - startY.current;
//     //  const trithree =newMouseY - startY.current;
//     //  contextRef.current.clearRect(0, 0, canvasRef.current.trione, canvasRef.current.tritwo,canvasRef.current.trithree);

//     //  contextRef.current.strokeTri(startX.current, startY.current,trione,tritwo,trithree);
//     //  contextRef.current.strokeRect(newMouseX.current,newMouseY.current,trione,tritwo,trithree)
// }
// const stopDrawingTriangle =() => {
//     setIsDrawing(false);
// }
// const startDrawingCircle =(nativeEvent) => {
    
//     console.log(nativeEvent)
//     nativeEvent.preventDefault();
//     nativeEvent.stopPropagation();
//     // const {canvasOffSetX,canvasOffSetY } = nativeEvent;
//     startX.current = nativeEvent.clientX - canvasOffSetX.current;
//     startY.current = nativeEvent.clientY - canvasOffSetY.current;
    
//     setIsDrawing(true);

// }
// const drawCircle = (nativeEvent) => {
//     if (!isDrawing) {
//         return;
//     }
    
//     console.log(canvasOffSetX)
//     console.log(canvasOffSetY)
//     nativeEvent.preventDefault();
//     nativeEvent.stopPropagation();
//     // const {canvasOffSetX,canvasOffSetY } = nativeEvent;
//     const newMouseX = nativeEvent.clientX - canvasOffSetX.current;
//     // const newMouseY = nativeEvent.clientY - canvasOffSetY.current;
//     //  console.log(newMouseX)
//     //  console.log(newMouseY)
//     //  console.log(canvasRef.current)
//     //  console.log(nativeEvent.clientY)
//     //  console.log(nativeEvent.offsetY)
//     const r = newMouseX/7;
//     contextRef.current.beginPath();
//      contextRef.current.clearRect(0, 0, startX.current*20, startY.current*20);
     
//     // contextRef.current.clearCir(0, 0, 0,2 * Math.PI );
    
//      contextRef.current.arc(startX.current,startY.current, r, 0, 2 * Math.PI, true);
//      contextRef.current.closePath();
//      contextRef.current.stroke();

//     //  //now, erase the arc by clearing a rectangle that's slightly larger than the arc
//     // contextRef.current.beginPath();
//     // contextRef.current.clearRect(nativeEvent.clientX - r + 1, nativeEvent.clientY - r + 1, r * 2 + 2, r * 2 + 2);
//     // contextRef.current.closePath();
     
    
//     //  contextRef.current.strokeTri(startX.current,startY.current,trione,tritwo,trithree)
// }
// const stopDrawingCircle =() => {
//     setIsDrawing(false);
// }

// const handleMouseDown=({nativeEvent})=>{
// if(option === "rect"){
//     startDrawingRectangle(nativeEvent)
// }
// else if (option === "cir"){
//     startDrawingCircle(nativeEvent)
    
// }
// else if (option === "tri"){
//     //setlastPoint(true)
//     startDrawingTriangle(nativeEvent)
   
    
// }
// else{
//     startDrawing(nativeEvent)
// }
// }

// function handleMouseMove({nativeEvent}){
// if(option === "rect"){
//     drawRectangle(nativeEvent);
// }
// else if (option === "cir"){
//     drawCircle(nativeEvent)
    
// }
// else if (option === "tri"){
//     drawTriangle(nativeEvent)
    
// }
// else{
//     draw(nativeEvent)
// }
// }
// function handleMouseUp({nativeEvent}){
// if(option === "rect"){
//     stopDrawingRectangle(nativeEvent);
// }
// else if (option === "cir"){
//     stopDrawingCircle(nativeEvent)
    
// }
// else if (option === "tri"){
//     stopDrawingTriangle(nativeEvent)
    
// }
// else{
//     stopDrawing(nativeEvent)
// }
// }
// function handleMouseLeave({nativeEvent}){
// if(option === "rect"){
//     stopDrawingRectangle(nativeEvent);
// }
// else if (option === "cir"){
//     stopDrawingCircle()
    
// }
// else if (option === "tri"){
//     stopDrawingTriangle(nativeEvent)
    
// }
// else{
//     stopDrawing(nativeEvent)
// }
// }
