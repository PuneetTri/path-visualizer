import { AiFillGithub } from "react-icons/ai";

const HeaderComponent = () => {
  return (
    <header className="p-4 bg-blue-500 space-y-4 w-screen fixed">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold">Path Visualizer</h1>
        <a href="https://github.com/PuneetTri/path-visualizer" target="_blank">
          <AiFillGithub className="w-8 h-8" />
        </a>
      </div>
    </header>
  );
};

export default HeaderComponent;
