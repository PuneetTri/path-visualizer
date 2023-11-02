const TooltipComponent = () => {
  return (
    <div className="mx-auto w-full grid grid-cols-3 gap-1">
      <span className="flex flex-row items-center space-x-2">
        <div className="border-[1px] border-black bg-green-500 h-6 w-6"></div>
        <p>Source</p>
      </span>

      <span className="flex flex-row items-center space-x-2">
        <div className="border-[1px] border-black bg-red-500 h-6 w-6"></div>
        <p>Destinaton</p>
      </span>

      <span className="flex flex-row items-center space-x-2">
        <div className="border-[1px] border-black bg-yellow-500 h-6 w-6"></div>
        <p>Path</p>
      </span>

      <span className="flex flex-row items-center space-x-2">
        <div className="border-[1px] border-black bg-gray-500 h-6 w-6"></div>
        <p>Visited</p>
      </span>

      <span className="flex flex-row items-center space-x-2">
        <div className="border-[1px] border-black bg-white h-6 w-6"></div>
        <p>Unvisited</p>
      </span>
    </div>
  );
};

export default TooltipComponent;
