const dijkstra = async (
  grid: string[][],
  setGrid: any,
  source: number[],
  destination: number[],
  speed: number,
  setNodesVisitedCount: any,
  setPathDistance: any
): Promise<boolean> => {
  return new Promise((resolve) => {
    let visited = new Set();
    const distances: { [key: string]: number } = {};
    const path: { [key: string]: number[] } = {};
    const pq = new PriorityQueue();
    const dirs = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    pq.enqueue(source, 0);
    distances[`${source[0]},${source[1]}`] = 0;

    const explore = () => {
      if (pq.isEmpty()) {
        resolve(false); // Destination not found
        return;
      }

      setTimeout(async () => {
        const [row, col] = pq.dequeue().element;

        if (row === destination[0] && col === destination[1]) {
          const found = await updateNodesToPath(
            path,
            destination,
            setGrid,
            speed,
            setPathDistance
          );
          if (found) {
            resolve(true); // Destination found
            setNodesVisitedCount((prevCount: number) => prevCount - 1);
          }
          return;
        }

        for (let dir of dirs) {
          const newRow = row + dir[0];
          const newCol = col + dir[1];

          if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length &&
            grid[newRow][newCol] !== "block"
          ) {
            const current = `${newRow},${newCol}`;
            const cost = distances[`${row},${col}`] + 1; // Cost is 1 for all neighboring nodes

            if (distances[current] === undefined || cost < distances[current]) {
              distances[current] = cost;
              path[current] = [row, col];
              pq.enqueue([newRow, newCol], cost);
              setNodesVisitedCount((prevCount: number) => prevCount + 1);
            }
          }
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

class PriorityQueue {
  items: any = [];
  constructor() {
    this.items = [];
  }

  enqueue(element: any, priority: any) {
    const queueElement = { element, priority };
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > queueElement.priority) {
        this.items.splice(i, 0, queueElement);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

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

export default dijkstra;
