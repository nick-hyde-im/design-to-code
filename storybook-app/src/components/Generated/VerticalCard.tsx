import React from "react";

export default function VerticalCard() {
  return (
    <article className="flex flex-col bg-white border border-gray-300 rounded-b-md w-full overflow-hidden">
      {/* Media Section */}
      <div className="relative w-full" style={{ aspectRatio: "3/2" }}>
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gray-400 bg-cover bg-center" />

        {/* Top elements overlay */}
        <div className="absolute top-0 right-0 flex flex-col items-end gap-2 p-2 z-10">
          {/* Premium Label */}
          <div className="flex flex-row items-center gap-1 px-2 py-0.5 bg-black border-2 border-yellow-400 rounded-full">
            <span className="text-yellow-400 text-sm font-semibold leading-snug">
              Premium
            </span>
            {/* Star icon placeholder */}
            <div className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 18 18" className="w-4 h-4 fill-yellow-400">
                <path d="M9 1l2.09 4.26L16 6.27l-3.5 3.41.83 4.82L9 12.25l-4.33 2.25.83-4.82L2 6.27l4.91-.01L9 1z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center w-15 h-15">
            {/* Inner circle */}
            <div className="absolute w-15 h-15 rounded-full bg-slate-800 opacity-40" style={{ width: 60, height: 60 }} />
            {/* Outer circle border */}
            <div
              className="absolute rounded-full border-4 border-white"
              style={{ width: 60, height: 60 }}
            />
            {/* Play icon */}
            <div className="relative z-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 fill-white"
                style={{ width: 34, height: 34 }}
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full px-4 py-4 gap-2 border-b border-gray-300">
        {/* Label */}
        <div className="pb-1">
          <span className="inline-flex items-center justify-center px-2.5 py-0.5 bg-teal-600 text-white text-xs font-semibold leading-5 rounded-sm">
            I&apos;m a Label
          </span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col w-full">
          {/* Span & Ticker row */}
          <div className="flex flex-row items-center gap-1 w-full">
            {/* Video span icon */}
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 20 20" className="w-5 h-5 fill-black">
                <path d="M4 4v12l9-6L4 4z" />
              </svg>
            </div>
            {/* Heading text */}
            <h2 className="flex-1 text-xl font-normal leading-snug text-sky-700 font-serif">
              Display |{" "}
              <span className="text-slate-800">Max line</span>
            </h2>
          </div>
          {/* Lower title text */}
          <p className="w-full text-xl font-normal leading-snug text-slate-800 font-serif">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>

        {/* Ratings */}
        <div className="flex flex-col w-full py-1">
          <div className="flex flex-row gap-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-400">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                </svg>
              </div>
            ))}
            {/* Half star */}
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-400">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17V2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sponsored */}
        <div className="flex flex-col w-full py-1">
          <span className="text-sm font-semibold leading-snug text-purple-500">
            Sponsored by
          </span>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <p className="text-sm font-normal leading-relaxed text-slate-800">
            Nullam sed posuere justo, nec laoreet neque. Praesent pretium lectus
            est, vitae aliquet velit varius sit amet. Morbi urna diam, placerat
            quis interdum semper, bibendum id turpis.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-row items-center gap-5 px-4 py-2.5 w-full border-t border-gray-300">
        {/* Icon Text 1 - Clock */}
        <div className="flex flex-row items-center gap-1">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-4 h-4 fill-sky-600">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.75 8.75H6.5v-1.5h2.75V5.5h1.5v5.25z" />
            </svg>
          </div>
          <span className="text-xs font-normal text-slate-800 leading-5">
            Icon text
          </span>
        </div>
      </div>
    </article>
  );
}
