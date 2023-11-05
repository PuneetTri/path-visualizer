import { useEffect, useState } from "react";

// Components
import HeaderComponent from "./components/HeaderComponent";
import GridComponent from "./components/GridComponent";
import TooltipComponent from "./components/TooltipComponent";

// Algorithms
import dfs from "./algorithms/dfs";
import bfs from "./algorithms/bfs";
import dijkstra from "./algorithms/djikstra";
import astar from "./algorithms/astar";
import AlgorithmPickerComponent from "./components/AlgorithmPickerComponent";
import addMaze from "./algorithms/addMaze";

function App() {
  const [grid, setGrid] = useState<any>([]);
  const [gridSize, setGridSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("Breadth First Search");
  const [description, setDescription] = useState<string>("");
  const [source, setSource] = useState([1, 1]);
  const [moveSource, setMoveSource] = useState<boolean>(false);
  const [destination, setDestination] = useState([gridSize - 2, gridSize - 2]);
  const [moveDestination, setMoveDestination] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(true);

  // Set the description based on the selected algorithm
  useEffect(() => {
    switch (algorithm) {
      case "Depth First Search":
        setDescription(
          "Depth-First Search (DFS) plunges deep into a graph by exploring as far as possible along a branch before backtracking. Useful for topological sorting, maze generation, and solving puzzles but might not guarantee the shortest path."
        );
        break;
      case "Breadth First Search":
        setDescription(
          "Breadth-First Search (BFS) systematically explores a graph by visiting all neighbors of a node before moving to the next level. It's efficient for finding shortest paths, analyzing connectivity, and solving puzzles like mazes or games."
        );
        break;
      case "Dijkstra's Algorithm":
        setDescription(
          "Dijkstra's Algorithm calculates the shortest path from a starting node to all other nodes in a weighted graph. It guarantees the shortest path, often used in mapping, networking, and GPS systems for route optimization."
        );
        break;
      case "A* Search":
        setDescription(
          "A* Search Algorithm efficiently finds the shortest path in weighted graphs by combining heuristic evaluation and cost to reach nodes. Widely used in pathfinding, robotics, and gaming for optimal route planning."
        );
        break;
    }
  }, [algorithm]);

  // Visualize the algorithm
  const visualizeAlgorithm = async (e: any) => {
    e.target.disabled = true; // Disable the button to prevent multiple clicks
    // Change style of the button to indicate that the algorithm is running
    e.target.classList.add("bg-gray-500");
    e.target.classList.remove("bg-green-500");
    e.target.innerText = "Visualizing...";

    // Visualize the algorithm based on the selected algorithm
    switch (algorithm) {
      case "Depth First Search":
        // 101 - speed, because smaller the slider value, slower the speed
        await dfs(grid, setGrid, source, destination, 101 - speed);
        break;
      case "Breadth First Search":
        await bfs(grid, setGrid, source, destination, 101 - speed);
        break;
      case "Dijkstra's Algorithm":
        await dijkstra(grid, setGrid, source, destination, 101 - speed);
        break;
      case "A* Search":
        await astar(grid, setGrid, source, destination, 101 - speed);
        break;
    }

    // Change the style of the button back to normal
    e.target.disabled = false;
    setClear(false); // Finally set grid to be not clear
  };

  // Reset the grid, but keep the source, destination nodes and the blocks
  const resetGrid = () => {
    // Check the grid and change all the visited nodes into unvisited nodes
    const temp = grid.slice();
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (temp[i][j] === "visited" || temp[i][j] === "path") {
          temp[i][j] = "unvisited";
        }
      }
    }

    setGrid(temp);
    setClear(true);
  };

  // Clear all the blocks placed on the grid
  const clearBlocks = () => {
    const temp = grid.slice();
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (temp[i][j] === "block") {
          temp[i][j] = "unvisited";
        }
      }
    }

    setGrid(temp);
  };

  return (
    <div>
      <HeaderComponent />

      <div className="py-16 lg:pb-0">
        <div className="m-4 block lg:hidden">
          <AlgorithmPickerComponent
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />
        </div>

        <main className="flex flex-col space-y-4 p-4 lg:flex-row lg:space-y-0">
          <GridComponent
            grid={grid}
            setGrid={setGrid}
            gridSize={gridSize}
            sourceState={[source, setSource]}
            moveSource={[moveSource, setMoveSource]}
            destinationState={[destination, setDestination]}
            moveDestination={[moveDestination, setMoveDestination]}
          />

          <div className="lg:w-1/2 space-y-4">
            <div>
              <div className="hidden lg:block">
                <AlgorithmPickerComponent
                  algorithm={algorithm}
                  setAlgorithm={setAlgorithm}
                />
              </div>

              <p>{description}</p>
            </div>

            <TooltipComponent />

            <div>
              <div className="flex flex-col">
                <label>
                  Grid Size ({`${gridSize}x${gridSize}`}){" "}
                  {`>25 size may lag in few systems`}
                </label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={gridSize}
                  onChange={(e: any) => setGridSize(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label>Speed ({`${speed}%`})</label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={speed}
                  onChange={(e: any) => setSpeed(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row space-x-2">
              <button
                onClick={clearBlocks}
                className="w-full bg-blue-500 p-4 text-white rounded-lg"
              >
                Clear Blocks
              </button>

              <button
                onClick={async () => {
                  addMaze(grid, setGrid, source, destination);
                }}
                className="w-full bg-blue-500 p-4 text-white rounded-lg"
              >
                Add Maze
              </button>
            </div>

            <button
              onClick={clear ? visualizeAlgorithm : resetGrid}
              className={`fixed lg:relative bottom-0 left-0 w-screen lg:w-full ${
                clear ? "bg-green-500" : "bg-red-500"
              } p-4 text-white lg:rounded-lg`}
            >
              {clear ? "Visualize Algorithm" : "Clear Grid"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
