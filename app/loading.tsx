import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80">
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-2 border-(--border-color)"
          aria-hidden
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-(--primary-color) animate-spin"
          aria-hidden
          style={{ animationDuration: "0.8s" }}
        />
      </div>
    </div>
  );
}
