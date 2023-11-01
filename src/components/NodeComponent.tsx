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

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleClick = () => {
    if (isSourceMoving) {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        newGrid[position[0]][position[1]] = "source";
        newGrid[source[0]][source[1]] = "unvisited";
        setSource(position);
        return newGrid;
      });
      setIsSourceMoving(false);
      return;
    }

    if (isDestinationMoving) {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        newGrid[position[0]][position[1]] = "destination";
        newGrid[destination[0]][destination[1]] = "unvisited";
        setDestination(position);
        return newGrid;
      });
      setIsDestinationMoving(false);
      return;
    }

    if (type === "unvisited") {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        newGrid[position[0]][position[1]] = "block";
        return newGrid;
      });
    }

    if (type === "block") {
      setGrid((prevGrid: any) => {
        const newGrid = prevGrid.slice();
        newGrid[position[0]][position[1]] = "unvisited";
        return newGrid;
      });
    }
  };

  const handleHover = () => {
    if (isMouseDown) {
      handleClick();
    }
  };

  switch (type) {
    case "source":
      return (
        <div
          onClick={() => setIsSourceMoving((prev: boolean) => !prev)}
          className={`border-[1px] border-black ${
            isSourceMoving ? "bg-green-700" : "bg-green-500"
          }`}
        ></div>
      );
    case "destination":
      return (
        <div
          onClick={() => setIsDestinationMoving((prev: boolean) => !prev)}
          className={`border-[1px] border-black ${
            isDestinationMoving ? "bg-red-700" : "bg-red-500"
          }`}
        ></div>
      );
    case "visited":
      return <div className="border-[1px] border-black bg-gray-500"></div>;
    case "path":
      return <div className="border-[1px] border-black bg-yellow-500"></div>;
    case "block":
      return (
        <div
          onMouseOver={handleHover}
          onClick={handleClick}
          className="border-[1px] border-black bg-black"
        ></div>
      );
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
