import React from "react";
import Image from "next/image";
import gridDot from "@/assets/GridDot.png";
export default function Line() {
  return (
    <div className="h-[50px] md:h-[72px] w-full border-t border-b border-(--border-color) flex items-center justify-center">
      <div className="MaxContainerWidth MaxContainerPadding flex items-center justify-between relative border-r border-l border-(--border-color) h-full">
        <Image
          src={gridDot}
          alt="grid-dot"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
