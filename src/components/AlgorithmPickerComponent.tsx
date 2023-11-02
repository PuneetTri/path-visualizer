type Props = {
  algorithm: string;
  setAlgorithm: any;
};

const AlgorithmPickerComponent = ({ algorithm, setAlgorithm }: Props) => {
  return (
    <select
      className={`w-full outline-none text-3xl font-bold -mx-1`}
      value={algorithm}
      onChange={(e) => setAlgorithm(e.target.value)}
    >
      <option>Breadth First Search</option>
      <option>Depth First Search</option>
      <option>Dijkstra's Algorithm</option>
      <option>A* Search</option>
    </select>
  );
};

export default AlgorithmPickerComponent;
