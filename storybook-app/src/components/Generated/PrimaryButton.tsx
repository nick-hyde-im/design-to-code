import React from "react";

export default function PrimaryButton() {
  return (
    <div className="relative w-[258px] h-[126px]">
      {/* Rectangle background */}
      <div className="absolute inset-0 bg-[#d9d9d9] rounded-sm" />

      {/* Text label */}
      <div className="absolute bottom-0 left-[47px] right-0 flex items-end pb-[9px]">
        <span
          className="text-black font-inter leading-tight"
          style={{ fontFamily: "Inter" }}
        >
          <span className="text-sm font-thin">I am A TEST piece of </span>
          <span className="text-2xl font-thin">T</span>
          <span className="text-2xl font-thin">EXT!</span>
        </span>
      </div>
    </div>
  );
}