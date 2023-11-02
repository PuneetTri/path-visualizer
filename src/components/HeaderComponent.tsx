import { AiFillGithub } from "react-icons/ai";

const HeaderComponent = () => {
  return (
    <header className="p-4 bg-blue-500 space-y-4 w-screen fixed">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">Path Visualizer</h1>
        <button
          onClick={() =>
            window.open("https://github.com/PuneetTri/path-visualizer")
          }
        >
          <AiFillGithub className="w-8 h-8" />
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
