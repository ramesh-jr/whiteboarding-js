import React from "react";

const Line = ({ coords = [] }) => {
  if (coords.length < 2) return null; // Ensure we have two points

  const x1 = coords[0]?.x;
  const y1 = coords[0]?.y;
  const x2 = coords[1]?.x;
  const y2 = coords[1]?.y;

  // Calculate distance and angle
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <div
      draggable
      style={{
        position: "absolute",
        left: x1,
        top: y1,
        width: `${length}px`,
        height: "2px",
        backgroundColor: "black",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 0",
      }}
    />
  );
};

export default Line;
