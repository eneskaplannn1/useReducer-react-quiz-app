import { PacmanLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="loader-container">
      <PacmanLoader size="100" color="#ff6019" />
      <p>Loading questions...</p>
    </div>
  );
}
