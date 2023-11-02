import { useEffect } from "react";
import NodeComponent from "./NodeComponent";

type Props = {
  grid: any[][];
  setGrid: any;
  gridSize: number;
  sourceState: any;
  moveSource: any;
  destinationState: any;
  moveDestination: any;
};

const GridComponent = ({
  grid,
  setGrid,
  gridSize,
  sourceState,
  moveSource,
  destinationState,
  moveDestination,
}: Props) => {
  // Only the state is needed, but imported as it needs to be send to node component
  const [source, setSource] = sourceState;
  const [destination, setDestination] = destinationState;

  // Resize the grid to fit the screen
  useEffect(() => {
    const handleResize = () => {
      const grid = document.getElementById("grid");
      const headerHeight = 100; // Header is rough;y 100px, so therfore the space
      const padding = 16; // Addition 1 rem padding

      // Resize the gird based on the window size
      if (grid) {
        const windowHeight = window.innerHeight;
        const availableHeight = windowHeight - headerHeight - 2 * padding;

        const size = Math.min(availableHeight, window.innerWidth - 2 * padding);

        grid.style.width = `${size}px`;
        grid.style.height = `${size}px`;
      }
    };

    handleResize();

    // Add event listener to resize the grid when the window is resized
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Insert the nodes into the grid based on the grid size
  useEffect(() => {
    // Rearrange the source and destination nodes as they are getting out ouf bounds,
    // might change it later to ensure they are within bounds and are not hard coded to the corners
    setSource([0, 0]);
    setDestination([gridSize - 1, gridSize - 1]);

    const temp = [];

    // Resize the grid based on the new grid size
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        if (i === 0 && j === 0) {
          row.push("source");
        } else if (i === gridSize - 1 && j === gridSize - 1) {
          row.push("destination");
        } else {
          row.push("unvisited");
        }
      }
      temp.push(row);
    }

    setGrid(temp);
  }, [gridSize]);

  return (
    <div className="lg:w-1/2 flex justify-center items-start">
      <div
        id="grid"
        style={{
          display: "grid",
          // Create a grid of size gridSize x gridSize, therfore the rows and columns are repeated
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
        className="border-[1px] border-black grid-rows-5"
      >
        {grid.map((row, rowIndex) =>
          row.map((type, colIndex) => (
            <NodeComponent
              key={`${rowIndex}-${colIndex}`}
              type={type}
              setGrid={setGrid}
              position={[rowIndex, colIndex]}
              sourceState={sourceState}
              moveSource={moveSource}
              destinationState={destinationState}
              moveDestination={moveDestination}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GridComponent;
