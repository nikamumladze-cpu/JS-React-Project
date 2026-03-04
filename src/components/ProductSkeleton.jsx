import React from "react";

const ProductSkeleton = () => {
  return (
    <div
      className="flex flex-col w-full overflow-hidden border animate-pulse shadow-sm"
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderColor: "var(--color-border-main)",
        borderRadius: "2.5rem",
        minHeight: "520px",
      }}>
      <div
        className="aspect-square m-2"
        style={{
          backgroundColor: "var(--color-bg-input)",
          borderRadius: "2rem",
          width: "calc(100% - 16px)",
        }}></div>

      <div className="flex flex-1 flex-col px-5 pb-5 mt-4 space-y-4 justify-between">
        <div className="space-y-3">
          <div className="h-3 w-1/4 rounded-full bg-indigo-500/10"></div>
          <div
            className="h-6 w-3/4 rounded-xl"
            style={{ backgroundColor: "var(--color-bg-input)" }}></div>
          <div className="space-y-2">
            <div
              className="h-3 w-full rounded-full"
              style={{ backgroundColor: "var(--color-bg-input)" }}></div>
            <div
              className="h-3 w-5/6 rounded-full"
              style={{ backgroundColor: "var(--color-bg-input)" }}></div>
          </div>
        </div>

        <div
          className="mt-auto flex h-16 items-center border p-1.5"
          style={{
            backgroundColor: "var(--color-bg-input)",
            borderColor: "var(--color-border-main)",
            borderRadius: "2rem",
          }}>
          <div className="ml-4 h-6 w-16 rounded-full bg-white/5"></div>
          <div className="ml-auto h-full w-24 rounded-3xl bg-indigo-500/20"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
