import React from "react";

function Rating({ score }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      <span className="text-yellow-500">★</span>
      <span>{score}/5</span>
    </div>
  );
}

export default Rating;