import React from "react";
import Image from "next/image";

export default function Review({
  name,
  icon,
  text,
  date,
}: {
  name: string;
  icon: string;
  text: string;
  date: string;
}) {
  const isExternal = icon.startsWith("http");
  return (
    <div className="flex flex-col bg-(--gray-color) border border-(--border-color) rounded-[14px] sm:rounded-[18px] md:rounded-[22px] p-[6px] sm:p-[8px] md:p-[10px]">
      <div className="bg-white rounded-[10px] sm:rounded-[14px] md:rounded-[18px] border border-(--border-color) w-full p-[16px] sm:p-[20px] md:p-[30px] gap-[16px] sm:gap-[20px] md:gap-[30px] flex flex-col">
        <p className="text-[14px] md:text-[16px] font-medium leading-[150%] tracking-0 break-words max-w-full">
          {text}
        </p>

        <div className="flex items-center gap-[12px] md:gap-[20px]">
          <Image
            src={icon || "/imgs/hero.png"}
            alt={name}
            width={48}
            height={48}
            unoptimized={isExternal}
            className="rounded-full object-cover w-[36px] h-[36px] md:w-[48px] md:h-[48px]"
          />
          <div className="flex flex-col gap-[6px] md:gap-[10px]">
            <h4 className="text-[14px] md:text-[16px] font-medium leading-[100%] tracking-[-2%]">
              {name}
            </h4>
            <p className="text-[#6C6C6C] text-[12px] md:text-[14px] font-regular leading-[150%] tracking-0">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
