const astar = async (
  grid: string[][],
  setGrid: any,
  source: number[],
  destination: number[],
  speed: number,
  setNodesVisitedCount: any,
  setPathDistance: any
): Promise<boolean> => {
  return new Promise((resolve) => {
    const pq = new PriorityQueue();
    const dirs = [
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1], // Right
    ];

    pq.enqueue(source, 0);
    const cameFrom: { [key: string]: number[] } = {};
    const costSoFar: { [key: string]: number } = {};
    costSoFar[`${source[0]},${source[1]}`] = 0;

    const explore = () => {
      setNodesVisitedCount((prevCount: number) => prevCount + 1);
      if (pq.isEmpty()) {
        resolve(false); // Destination not found
        return;
      }

      setTimeout(async () => {
        const [row, col] = pq.dequeue().element;

        if (row === destination[0] && col === destination[1]) {
          const found = await updateNodesToPath(
            cameFrom,
            destination,
            setGrid,
            speed,
            setPathDistance
          );
          if (found) {
            resolve(true); // Destination found
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
            const newCost = costSoFar[`${row},${col}`] + 1; // Cost to move to a neighbor is always 1

            if (
              costSoFar[current] === undefined ||
              newCost < costSoFar[current]
            ) {
              costSoFar[current] = newCost;
              const priority =
                newCost + heuristic(destination, [newRow, newCol]);
              pq.enqueue([newRow, newCol], priority);
              cameFrom[current] = [row, col];
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

const heuristic = (a: number[], b: number[]): number => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]); // Manhattan distance
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
  cameFrom: { [key: string]: number[] },
  destination: number[],
  setGrid: any,
  speed: number,
  setPathDistance: any
) => {
  return new Promise((resolve) => {
    const pathNodes: any = [];
    let current = `${destination[0]},${destination[1]}`;

    while (cameFrom[current]) {
      pathNodes.unshift(cameFrom[current]);
      current = cameFrom[current].join(",");
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

export default astar;
