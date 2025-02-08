import React, { useEffect, useRef, useState } from "react";

const Rectangle = ({ coords = [] }) => {
  const [currPos, setCurrPos] = useState();
  const [enableInput, setEnableInput] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const isSecondHigher =
      coords[1]?.y < coords[0]?.y || coords[1]?.x < coords[0]?.x;
    setCurrPos({
      x: isSecondHigher ? coords[1]?.x : coords[0]?.x,
      y: isSecondHigher ? coords[1]?.y : coords[0]?.y,
    });
  }, []);

  const width = Math.abs(coords[0]?.x - coords[1]?.x);
  const height = Math.abs(coords[0]?.y - coords[1]?.y);

  const onChange = (e) => {
    console.log("onChage", e?.target?.value);
    setValue((prev) => e.target.value);
  };

  const inputRef = useRef(null);

  return (
    <div
      draggable
      style={{
        width: width,
        height: height,
        position: "absolute",
        left: currPos?.x,
        top: currPos?.y,
        border: "2px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      onDragEnd={(e) => {
        console.log("On Drag End", e);
        setCurrPos();
      }}
      onDoubleClick={() => {
        console.log("On Double Click");
        setEnableInput(true);
        inputRef?.current?.focus();
      }}
    >
      {/* <p style={{ color: 'blue' }}>Rectangle</p> */}
      <p style={{ color: "purple" }}>{!enableInput && value}</p>
      {enableInput && (
        <div style={{ border: "none" }}>
          <input
            ref={inputRef}
            key="rectangle-input"
            type="text"
            value={value}
            onChange={onChange}
            style={{
              width: width,
              height: height,
              color: "black",
              outline: "none",
            }}
            onSubmit={() => {
              console.log("OnSubmit");
              setEnableInput(false);
            }}
            onKeyDown={(e) => {
              console.log("Key", e.key);
              if (e.key === "Enter" || e.key === "Escape") {
                // Call your desipurple function here
                setEnableInput(false);
                console.log("Enter key pressed");
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Rectangle;
