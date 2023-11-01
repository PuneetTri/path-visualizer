import { useEffect, useState } from "react";
import HeaderComponent from "./components/HeaderComponent";
import GridComponent from "./components/GridComponent";
import dfs from "./algorithms/dfs";
import bfs from "./algorithms/bfs";
import dijkstra from "./algorithms/djikstra";
import astar from "./algorithms/astar";
import TooltipComponent from "./components/TooltipComponent";

function App() {
  const [grid, setGrid] = useState<any>([]);
  const [gridSize, setGridSize] = useState(10);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("Dijkstra's Algorithm");
  const [description, setDescription] = useState<string>("");
  const [source, setSource] = useState([0, 0]);
  const [moveSource, setMoveSource] = useState<boolean>(false);
  const [destination, setDestination] = useState([gridSize - 1, gridSize - 1]);
  const [moveDestination, setMoveDestination] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(true);

  const visualizeAlgorithm = async (e: any) => {
    e.target.disabled = true;
    // Change style of the button to indicate that the algorithm is running
    e.target.classList.add("bg-gray-500");
    e.target.classList.remove("bg-green-500");
    e.target.innerText = "Visualizing...";

    if (algorithm === "Depth First Search") {
      await dfs(grid, setGrid, source, destination, 101 - speed);
    } else if (algorithm === "Breadth First Search") {
      await bfs(grid, setGrid, source, destination, 101 - speed);
    } else if (algorithm === "Dijkstra's Algorithm") {
      await dijkstra(grid, setGrid, source, destination, 101 - speed);
    } else if (algorithm === "A* Search") {
      await astar(grid, setGrid, source, destination, 101 - speed);
    }

    e.target.disabled = false;
    setClear(false);
  };

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

  const addMaze = () => {
    clearBlocks();
    const temp = grid.slice();
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (temp[i][j] === "unvisited") {
          // Create a 30% random chance of adding a block
          if (Math.random() < 0.3) temp[i][j] = "block";
        }
      }
    }

    setGrid(temp);
  };

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

  return (
    <div>
      <HeaderComponent />

      <div className="py-16 lg:pb-0">
        <div className="m-4 block lg:hidden">
          <select
            className="w-full outline-none text-3xl font-bold -mx-1"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option>Breadth First Search</option>
            <option>Depth First Search</option>
            <option>Dijkstra's Algorithm</option>
            <option>A* Search</option>
          </select>
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
              <select
                className="w-full outline-none text-3xl font-bold hidden lg:block -mx-1"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
              >
                <option>Breadth First Search</option>
                <option>Depth First Search</option>
                <option>Dijkstra's Algorithm</option>
                <option>A* Search</option>
              </select>
              <p>{description}</p>
            </div>

            <TooltipComponent />

            <div>
              <div className="flex flex-col">
                <label>Grid Size ({`${gridSize}x${gridSize}`})</label>
                <input
                  type="range"
                  min={5}
                  max={25}
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
                onClick={addMaze}
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
