import React, { useState, useContext } from "react";
import "./Palette.css";
import { ColorContext } from "../context/ColorContext";
import BlinkingText from "./Blink.js";
import { FillColorContext } from "../context/FillcolorContext";
export default function Palette(props) {
    const [selectedColor, setSelectedColor] = useState("");
    const { selectColor, setSelected } = useContext(ColorContext);
    const { fillColor, setFillColor } = useContext(FillColorContext);

    const paletteStyling = {
        width: "30%",
        backgroundColor: "white",
        marginTop: "1%",
        marginRight: "8%",
        padding: "1%",
        display: "inline-block",

    };

    const colorPalette = {
        display: "flex",
        // flexWrap: "wrap",
        position: "relative"
    };

    const handleColorClick = (colorName) => {
        setSelected(colorName);
        setSelectedColor(colorName);
        setFillColor(colorName);
        props.opt("Toolbox");
    };


    return (
        <div style={paletteStyling}>
            <div className="heading">Select Options</div>

            <div className="color-palette" style={colorPalette}>
                <BlinkingText colorP={<div
                    className="color-react"
                    style={{
                        backgroundColor: `${"green"}`,
                        // height: "100px",
                        // width: "180px",
                        // margin: "6% 10% 5% 15%",
                    }}
                    onClick={() => handleColorClick("Green")}
                ></div>} freq={300}></BlinkingText>

                <BlinkingText colorP={<div
                    className="color-react"
                    style={{
                        backgroundColor: `${"blue"}`,
                        // height: "100px",
                        // width: "180px",
                        // margin: "6% 10% 5% 60%",
                    }}
                    onClick={() => handleColorClick("Blue")}
                ></div>} freq={200}></BlinkingText>

                <BlinkingText colorP={<div
                    className="color-react"
                    style={{
                        backgroundColor: `${"purple"}`,
                        // height: "100px",
                        // width: "180px",
                        // margin: "6% 10% 5% 15%",
                    }}
                    onClick={() => handleColorClick("Purple")}
                ></div>} freq={100}></BlinkingText>

                <BlinkingText colorP={<div
                    className="color-react"
                    style={{
                        backgroundColor: `${"red"}`,
                        // height: "100px",
                        // width: "180px",
                        // margin: "6% 10% 5% 60%",
                    }}
                    onClick={() => handleColorClick("Red")}
                ></div>} freq={400}></BlinkingText>

                <BlinkingText colorP={<div
                    className="color-react"
                    style={{
                        backgroundColor: `${"black"}`,
                        // height: "100px",
                        // width: "180px",
                        // margin: "6% 10% 5% 15%",
                    }}
                    onClick={() => handleColorClick("Black")}
                ></div>} freq={600}></BlinkingText>

                <BlinkingText colorP={<div
                    className="color-react"
                    style={{
                        backgroundColor: `${"yellow"}`,
                        // height: "100px",
                        // width: "180px",
                        // margin: "6% 10% 5% 60%",
                    }}
                    onClick={() => handleColorClick("Yellow")}
                ></div>} freq={700}></BlinkingText>

                <div>


                </div>

            </div>

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
                    value={selectedColor}
                    readOnly />
            </div>
        </div>
    );
}