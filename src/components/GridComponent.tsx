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
  nodesVisitedCount: number;
  pathDistance: number;
};

const GridComponent = ({
  grid,
  setGrid,
  gridSize,
  sourceState,
  moveSource,
  destinationState,
  moveDestination,
  nodesVisitedCount,
  pathDistance,
}: Props) => {
  // Only the setter function is needed, but imported as it needs to be send to node component
  const setSource = sourceState[1];
  const setDestination = destinationState[1];

  // Checkpoint setter state
  // const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

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
    setSource([1, 1]);
    setDestination([gridSize - 2, gridSize - 2]);

    const temp = [];

    // Resize the grid based on the new grid size
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        if (i === 1 && j === 1) {
          row.push("source");
        } else if (i === gridSize - 2 && j === gridSize - 2) {
          row.push("destination");
        } else {
          row.push("unvisited");
        }
      }
      temp.push(row);
    }

    setGrid(temp);
  }, [gridSize]);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "c" || e.key === "C") {
  //       setIsKeyDown((prevState) => {
  //         return !prevState;
  //       });
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <div className={`lg:w-1/2 flex flex-col justify-center items-start`}>
      <div
        id="grid"
        style={{
          display: "grid",
          // Create a grid of size gridSize x gridSize, therfore the rows and columns are repeated
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
        className="border-[1px] border-black grid-rows-5 self-center"
      >
        {grid.map((row, rowIndex) =>
          row.map((type, colIndex) => (
            <NodeComponent
              key={`${rowIndex}-${colIndex}`}
              uid={`${rowIndex}-${colIndex}`}
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

      <div className="self-center flex flex-row justify-between">
        <p style={{ marginRight: "10px" }}>
          Nodes Visited: {nodesVisitedCount}
        </p>
        <p>Shortest Path Distance: {pathDistance}</p>
      </div>
    </div>
  );
};

export default GridComponent;
