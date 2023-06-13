import React, { useState, useEffect } from 'react';
const BlinkingText = (props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible(visible => !visible);
    }, props.freq);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <span onClick={props.onClick} style={{ visibility: visible ? 'visible' : 'hidden' }}>

   {props.colorP}
  </span>;
};

export default BlinkingText;