
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Canvas from "./Canvas";
import './home.css';
import { ColorProvider } from "../context/ColorContext";
import ToolCards from "./ToolCards";
import { PencilSizeProvider } from "../context/PencilContext";

import { ToolProvider } from "../context/ToolContext";
import { FillColorProvider } from "../context/FillcolorContext";
import { OptionProvider } from "../context/OptionContext";
import { BrushProvider } from "../context/BrushContext";
import { DrawToolProvider } from "../context/drawTool";
import { ElementsProvider } from "../context/ElementsContext";

function Home() {
  return (
    <>
     
        <div>
          <ElementsProvider>
          <OptionProvider>
          <ColorProvider>
            <PencilSizeProvider>
            
                <ToolProvider>
                <FillColorProvider>
                  <BrushProvider>
                  <DrawToolProvider>
               
                  <div className="app-div-container">
                    <ToolCards />

                    <Canvas />

                  </div>
                  </DrawToolProvider>
                  </BrushProvider>
                  </FillColorProvider>
                </ToolProvider>
              
            </PencilSizeProvider>
          </ColorProvider>
          </OptionProvider>
          </ElementsProvider>

          {/* 
    </ColorProvider>
      <Palette/> */}
          {/* <Shapes/> */}

          {/* <Footer /> */}

        </div>
        

    </>
  );
};

export default Home;