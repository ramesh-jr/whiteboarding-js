import { use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Rectangle from "./components/Rectangle";
import Circle from "./components/Circle";
import Line from "./components/Line";

function App() {
  const [coords, setCoords] = useState([]);

  const [isRectDraw, setIsRectDraw] = useState();
  const [rectP1, setRectp1] = useState();

  const [rectCoords, setRectCoords] = useState([]);
  const [finalCoords, setFinalCoords] = useState([]);
  const [finalCoordsRect, setFinalCoordsRect] = useState([]);
  const [finalCoordsCircle, setFinalCoordsCirle] = useState([]);
  const [finalCoordsLine, setFinalCoordsLine] = useState([]);

  const [currentMode, setCurrentMode] = useState(null);

  const [value, setValue] = useState("");

  const onChange = (e) => {
    console.log("onChage", e?.target?.value);
    setValue(e.target.value);
  };
  document.addEventListener("keydown", (e) => {
    e?.key === "Escape" && setCurrentMode("");
  });

  return (
    <div
      onKeyDown={(e) => {
        console.log("Esc", e.key);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <button
          onClick={() => {
            setCurrentMode("rect");
          }}
        >
          Rectangle
        </button>
        <button
          onClick={() => {
            setCurrentMode((prev) => "circle");
          }}
        >
          Circle
        </button>
        <button
          onClick={() => {
            setCurrentMode((prev) => "line");
          }}
        >
          Line
        </button>
        <button
          onClick={() => {
            setCurrentMode((prev) => "");
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            setFinalCoordsRect([]);
            setFinalCoordsCirle([]);
            setFinalCoordsLine([]);
            setCoords([]);
          }}
        >
          Clear
        </button>
        <div style={{ border: "2px solid black" }}></div>
      </div>
      <div
        id="canvas"
        style={{
          width: "100vw",
          height: "100vh",
          border: "1px solid purple",
          backgroundColor: "white",
        }}
        onMouseDown={(e) => {
          console.log("On onMouseDown", e);
          // setCoords((prev) => [...prev, { x: e.pageX, y: e.pageY }])
          setRectp1({ x: e?.pageX, y: e?.pageY });
          setIsRectDraw(true);
        }}
        onMouseUp={(e) => {
          // console.log("On onMouseUp", e)
          console.log("On onMouseUp", currentMode);

          const currX = e?.pageX;
          const currY = e?.pageY;
          if (isRectDraw) {
            const currDimensions = [
              { x: rectP1?.x, y: rectP1?.y },
              { x: currX, y: currY },
            ];
            console.log("Curr before", {
              rectP1,
              currX,
              currY,
              currDimensions,
            });
            // setRectCoords((prev) => [...currDimensions])
            if (currentMode === "rect") {
              setFinalCoordsRect([...finalCoordsRect, [...currDimensions]]);
            } else if (currentMode === "circle") {
              setFinalCoordsCirle([...finalCoordsCircle, [...currDimensions]]);
            } else if (currentMode === "line") {
              setFinalCoordsLine([...finalCoordsLine, [...currDimensions]]);
            }

            setRectp1({});
            setIsRectDraw(false);
          }
        }}
      >
        {/* {coords?.map((coord) => {
          return (
            <div style={{ position: 'absolute', top: coord.y, left: coord.x, width: 10, height: 10, backgroundColor: 'purple', borderRadius: '50%' }}>
            </div>)
        })} */}
        {console.log("Curr Mode", currentMode)}

        {finalCoordsRect?.map((coord) => {
          return <Rectangle coords={coord} />;
        })}
        {finalCoordsCircle?.map((coord) => {
          return <Circle coords={coord} />;
        })}
        {finalCoordsLine?.map((coord) => {
          return <Line coords={coord} />;
        })}
      </div>
    </div>
  );
}

export default App;
