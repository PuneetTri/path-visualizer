const bfs = async (
  grid: string[][],
  setGrid: any,
  source: number[],
  destination: number[],
  speed: number,
  setNodesVisitedCount: any,
  setPathDistance: any
): Promise<boolean> => {
  return new Promise((resolve) => {
    const visited = new Set<string>();
    const queue: number[][] = [source];
    const path: { [key: string]: number[] } = {};

    const explore = () => {
      if (queue.length === 0) {
        resolve(false); // Destination not found
        return;
      }

      setTimeout(async () => {
        const [row, col] = queue.shift() as number[];

        if (row === destination[0] && col === destination[1]) {
          const found = await updateNodesToPath(
            path,
            destination,
            setGrid,
            speed,
            setPathDistance
          );
          if (found) {
            setNodesVisitedCount((prevCount: number) => prevCount + 1);
            resolve(true); // Destination found
          }
          return;
        }

        const current = `${row},${col}`;
        if (visited.has(current)) {
          explore();
          return;
        }

        setNodesVisitedCount((prevCount: number) => prevCount + 1);
        visited.add(current);

        if (
          row > 0 &&
          grid[row - 1][col] !== "block" &&
          !visited.has(`${row - 1},${col}`)
        ) {
          queue.push([row - 1, col]);
          path[`${row - 1},${col}`] = [row, col];
        }
        if (
          row < grid.length - 1 &&
          grid[row + 1][col] !== "block" &&
          !visited.has(`${row + 1},${col}`)
        ) {
          queue.push([row + 1, col]);
          path[`${row + 1},${col}`] = [row, col];
        }
        if (
          col > 0 &&
          grid[row][col - 1] !== "block" &&
          !visited.has(`${row},${col - 1}`)
        ) {
          queue.push([row, col - 1]);
          path[`${row},${col - 1}`] = [row, col];
        }
        if (
          col < grid[0].length - 1 &&
          grid[row][col + 1] !== "block" &&
          !visited.has(`${row},${col + 1}`)
        ) {
          queue.push([row, col + 1]);
          path[`${row},${col + 1}`] = [row, col];
        }

        setGrid((prevGrid: string[][]) => {
          const newGrid = prevGrid.slice();
          const node = newGrid[row][col];
          if (node !== "source" && node !== "destination") {
            newGrid[row][col] = "visited";
          }
          return newGrid;
        });

        explore();
      }, speed);
    };

    explore();
  });
};

const updateNodesToPath = async (
  path: { [key: string]: number[] },
  destination: number[],
  setGrid: any,
  speed: number,
  setPathDistance: any
) => {
  return new Promise((resolve) => {
    const pathNodes: any = [];
    let current = `${destination[0]},${destination[1]}`;

    while (path[current]) {
      pathNodes.unshift(path[current]);
      current = path[current].join(",");
    }

    let i = 1;

    const updateNode = () => {
      if (i < pathNodes.length) {
        setPathDistance((prevDistance: number) => prevDistance + 1);
        const [x, y] = pathNodes[i];
        setGrid((prevGrid: any) => {
          const newGrid = prevGrid.slice();
          newGrid[x][y] = "path";

          // Not working right now, but I want to add arrows to the path
          // const element = document.getElementById(`${x}-${y}`);
          // if (element) {
          //   element.innerHTML = "<BsChevronLeft class='w-full h-full block' />";
          // }
          return newGrid;
        });
        i++;
        setTimeout(updateNode, speed);
      } else {
        resolve(true); // Resolves when all nodes are updated to 'path'
      }
    };

    updateNode();
  });
};

export default bfs;
