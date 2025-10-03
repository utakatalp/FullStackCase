import React, { useRef } from "react";
import { ACTIONS } from "../app/store";

function Carousel({ items, carouselIndex, dispatch, renderItem }) {
  const containerRef = useRef(null);

  // index azalt
  const handlePrev = () => {
    if (carouselIndex > 0) {
      dispatch({
        type: ACTIONS.SET_CAROUSEL_INDEX,
        payload: carouselIndex - 1,
      });
    }
  };

  // index artır
  const handleNext = () => {
    if (carouselIndex < items.length - 1) {
      dispatch({
        type: ACTIONS.SET_CAROUSEL_INDEX,
        payload: carouselIndex + 1,
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel content */}
      <div
        ref={containerRef}
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        disabled={carouselIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full"
      >
        ◀
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={carouselIndex === items.length - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full"
      >
        ▶
      </button>
    </div>
  );
}

export default Carousel;