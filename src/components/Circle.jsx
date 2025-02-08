import React, { useState, useRef } from "react";

const Circle = ({ coords = [] }) => {
  const [enableInput, setEnableInput] = useState(false);
  const [value, setValue] = useState("");

  const width = Math.abs(coords[0]?.x - coords[1]?.x);
  const height = Math.abs(coords[0]?.y - coords[1]?.y);

  const isSecondHigher =
    coords[1]?.y < coords[0]?.y || coords[1]?.x < coords[0]?.x;

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
        left: isSecondHigher ? coords[1]?.x : coords[0]?.x,
        top: isSecondHigher ? coords[1]?.y : coords[0]?.y,
        border: "2px solid black",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      onDoubleClick={() => {
        console.log("On Double Click");
        setEnableInput(true);
        inputRef?.current?.focus();
      }}
    >
      <p
        style={{
          color: "purple",
        }}
      >
        {!enableInput && value}
      </p>
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
              borderRadius: "50%",
              outline: "none",
            }}
            onSubmit={() => {
              console.log("OnSubmit");
              setEnableInput(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                // Call your desired function here
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

export default Circle;
