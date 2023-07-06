import React, { useState } from "react";
import Star from "./Star";
const StarRating = ({ maxStar, currentRating, setCurrentRating }) => {
  const [hoverState, setHoverState] = useState(null);
  const [text, setText] = useState("Star rating");
  function handleStarClick(index) {
    setCurrentRating(index + 1);

    switch (index + 1) {
      case 1:
        setText("Terrible");
        break;
      case 2:
        setText("Bad");
        break;
      case 3:
        setText("Good");
        break;
      case 4:
        setText("Excellent");
        break;
      case 5:
        setText("Awesome");
        break;
      default:
        setText("Star Rating");
        break;
    }
  }
  return (
    <div>
      <h1>{text}</h1>
      {Array.from({ length: maxStar }).map((_, index) => (
        <span
          key={index}
          onMouseEnter={() => setHoverState(index)}
          onMouseLeave={() => setHoverState(null)}
          onClick={() => handleStarClick(index)}
        >
          <Star
            filled={
              hoverState !== null ? index <= hoverState : index < currentRating
            }
          />
        </span>
      ))}
    </div>
  );
};
export default StarRating;
