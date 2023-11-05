const addMaze = (
  grid: string[][],
  setGrid: any,
  source: number[],
  destination: number[]
) => {
  const temp = grid.map((row) => [...row]);

  const generateMaze = (
    row: number,
    col: number,
    rows: number,
    cols: number
  ) => {
    const stack = [];
    stack.push([row, col]);
    temp[row][col] = "path"; // Start cell

    while (stack.length) {
      const [currentRow, currentCol]: any = stack[stack.length - 1];
      const unvisitedNeighbors = [];

      const directions = [
        [0, 2, 0, 1], // Move two rows up
        [0, -2, 0, -1], // Move two rows down
        [2, 0, 1, 0], // Move two columns right
        [-2, 0, -1, 0], // Move two columns left
      ];

      for (const [rowOffset, colOffset, rowMid, colMid] of directions) {
        const newRow = currentRow + rowOffset;
        const newCol = currentCol + colOffset;
        const midRow = currentRow + rowMid;
        const midCol = currentCol + colMid;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          temp[newRow][newCol] === "unvisited"
        ) {
          unvisitedNeighbors.push([newRow, newCol, midRow, midCol]);
        }
      }

      if (unvisitedNeighbors.length) {
        const [nRow, nCol, midRow, midCol] =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];
        temp[nRow][nCol] = "path";
        temp[midRow][midCol] = "path";
        stack.push([nRow, nCol]);
      } else {
        stack.pop();
      }
    }
  };

  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      temp[i][j] = "unvisited";
    }
  }

  const adjustedRows = rows % 2 === 0 ? rows - 1 : rows - 1;
  const adjustedCols = cols % 2 === 0 ? cols - 1 : cols - 1;

  generateMaze(
    rows % 2 === 0 ? 0 : 1,
    rows % 2 === 0 ? 0 : 1,
    adjustedRows,
    adjustedCols
  ); // Start from an inner cell

  // Always create a path from the top left corner to the bottom right corner
  for (let i = adjustedRows; i > 0; i -= 2) {
    if (temp[i][adjustedCols] === "path") {
      temp[i + 1][adjustedCols] = "path";
      break;
    }
  }

  // Set source and destination
  temp[source[0]][source[1]] = "source";
  temp[destination[0]][destination[1]] = "destination";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (temp[i][j] === "unvisited") {
        temp[i][j] = "block";
      }
    }

    for (let j = 0; j < cols; j++) {
      if (temp[i][j] === "path") {
        temp[i][j] = "unvisited";
      }
    }
  }

  setGrid(temp);
};

export default addMaze;
