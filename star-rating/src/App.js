import { useState } from "react";
import StarRating from "./StarRating";
import "./styles.css";
export default function App() {
  const [currentRating, setCurrentRating] = useState(3);
  return (
    <div className="App">
      <StarRating
        maxStar={5}
        currentRating={currentRating}
        setCurrentRating={setCurrentRating}
      />
    </div>
  );
}
