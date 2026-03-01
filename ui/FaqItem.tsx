"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col bg-(--gray-color) border border-(--border-color) p-[6px] sm:p-[8px] md:p-[10px] rounded-[14px] sm:rounded-[18px] md:rounded-[22px]">
      <div
        className="w-full h-full bg-white rounded-[10px] sm:rounded-[14px] md:rounded-[18px] cursor-pointer border border-(--border-color) p-[14px] sm:p-[18px] md:p-[22px] hover:translate-y-[-5px] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex gap-[10px] md:gap-[12px] w-full text-left">
          <Image
            src="/imgs/FaqArrow.svg"
            alt="arrow"
            width={20}
            height={18}
            className={`shrink-0 mt-[3px] w-[16px] h-[14px] md:w-[20px] md:h-[18px] transition-transform duration-300 ${
              open ? "-rotate-90" : "rotate-0"
            }`}
          />
          <h3 className="text-[15px] sm:text-[17px] md:text-[20px] font-medium leading-[120%] md:leading-[100%] tracking-[-2%] min-w-0 flex-1">
            {question}
          </h3>
        </div>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out pl-[26px] md:pl-[32px] ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-[13px] sm:text-[14px] md:text-[16px] leading-[150%] text-[#6C6C6C] mt-[8px] md:mt-[11px]">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}