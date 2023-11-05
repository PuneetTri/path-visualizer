const dfs = async (
  grid: string[][],
  setGrid: any,
  source: number[],
  destination: number[],
  speed: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    const visited = new Set<string>();
    const path: number[][] = [];
    const stack: number[][] = [source];

    const explore = () => {
      if (stack.length === 0) {
        resolve(false); // Destination not found
        return;
      }

      setTimeout(async () => {
        const [row, col] = stack.pop() as number[];

        if (row === destination[0] && col === destination[1]) {
          const found = await updateNodesToPath([...path], setGrid, speed);
          if (found) {
            resolve(true); // Destination found
          }
          return;
        }

        const current = `${row},${col}`;
        if (visited.has(current)) {
          explore();
          return;
        }

        visited.add(current);
        path.push([row, col]);

        setGrid((prevGrid: string[][]) => {
          const newGrid = prevGrid.slice();
          const node = newGrid[row][col];
          if (node !== "source" && node !== "destination") {
            newGrid[row][col] = "visited";
          }
          return newGrid;
        });

        if (row > 0 && grid[row - 1][col] !== "block")
          stack.push([row - 1, col]);
        if (row < grid.length - 1 && grid[row + 1][col] !== "block")
          stack.push([row + 1, col]);
        if (col > 0 && grid[row][col - 1] !== "block")
          stack.push([row, col - 1]);
        if (col < grid[0].length - 1 && grid[row][col + 1] !== "block")
          stack.push([row, col + 1]);

        explore();
      }, speed);
    };

    explore();
  });
};

const updateNodesToPath = async (
  path: number[][],
  setGrid: any,
  speed: number
) => {
  return new Promise((resolve) => {
    let i = 1;

    const updateNode = () => {
      if (i < path.length) {
        const [x, y] = path[i];
        setGrid((prevGrid: any) => {
          const newGrid = prevGrid.slice();
          newGrid[x][y] = "path";
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

export default dfs;
