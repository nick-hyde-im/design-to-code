import React from "react";

export default function Group1() {
  return (
    <div className="relative" style={{ width: 258, height: 126 }}>
      {/* Rectangle 1 */}
      <div className="absolute inset-0 bg-[#d9d9d9]" />

      {/* "hello again" text */}
      <span
        className="absolute text-black font-thin text-sm leading-none"
        style={{
          left: 166,
          top: 18,
          fontFamily: "Inter",
          fontWeight: 100,
          fontSize: 14,
        }}
      >
        hello again
      </span>
    </div>
  );
}