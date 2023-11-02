import { useState, useEffect } from "react";

type Props = {
  type?: string;
  setGrid: any;
  position: number[];
  sourceState: any;
  moveSource: any;
  destinationState: any;
  moveDestination: any;
};

const NodeComponent = ({
  type,
  setGrid,
  position,
  sourceState,
  moveSource,
  destinationState,
  moveDestination,
}: Props) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isSourceMoving, setIsSourceMoving] = moveSource;
  const [isDestinationMoving, setIsDestinationMoving] = moveDestination;
  const [source, setSource] = sourceState;
  const [destination, setDestination] = destinationState;

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    // Add event listeners to check if the mouse is clicked and dragged on the grid
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Remove the event listeners when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Handle various cases when an unvisited node is clicked
  const handleClick = () => {
    // Check if the source is moving, therefore clicked on earlier
    if (isSourceMoving) {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        // Set the clicked node as the new source, and the previous source as unvisited
        newGrid[position[0]][position[1]] = "source";
        newGrid[source[0]][source[1]] = "unvisited";

        setSource(position); // Set the new source state as well
        return newGrid;
      });

      // Set the source moving to false as the source has been moved
      setIsSourceMoving(false);
      return;
    }

    // Check if the destination is moving, therefore clicked on earlier
    if (isDestinationMoving) {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        // Set the clicked node as the new destination, and the previous source as unvisited
        newGrid[position[0]][position[1]] = "destination";
        newGrid[destination[0]][destination[1]] = "unvisited";
        setDestination(position); // Set the new destination state as well
        return newGrid;
      });

      // Set the destination moving to false as the destination has been moved
      setIsDestinationMoving(false);
      return;
    }

    // If the source or destination is not moving, then toggle the node between block and unvisited
    if (type === "unvisited") {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        newGrid[position[0]][position[1]] = "block";
        return newGrid;
      });
    }

    // If the node is a block, then toggle it to unvisited
    if (type === "block") {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        newGrid[position[0]][position[1]] = "unvisited";
        return newGrid;
      });
    }
  };

  // If the mouse is clicked and dragged, then call the handleClick function
  const handleHover = () => {
    if (isMouseDown) {
      handleClick();
    }
  };

  // Return the node based on its type
  switch (type) {
    // Source node
    case "source":
      return (
        <div
          onClick={() => setIsSourceMoving((prev: boolean) => !prev)}
          className={`border-[1px] border-black ${
            isSourceMoving ? "bg-green-700" : "bg-green-500"
          }`}
        ></div>
      );

    // Destination node
    case "destination":
      return (
        <div
          onClick={() => setIsDestinationMoving((prev: boolean) => !prev)}
          className={`border-[1px] border-black ${
            isDestinationMoving ? "bg-red-700" : "bg-red-500"
          }`}
        ></div>
      );

    // Visited node
    case "visited":
      return <div className="border-[1px] border-black bg-gray-500"></div>;

    // Path node
    case "path":
      return <div className="border-[1px] border-black bg-yellow-500"></div>;

    // Block node
    case "block":
      return (
        <div
          onMouseOver={handleHover}
          onClick={handleClick}
          className="border-[1px] border-black bg-black"
        ></div>
      );

    // By default, it will be an unvisited node
    default:
      return (
        <div
          onMouseOver={handleHover}
          onClick={handleClick}
          className="border-[1px] border-black bg-white"
        ></div>
      );
  }
};

export default NodeComponent;
