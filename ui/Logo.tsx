import React from "react";
import Image from "next/image";
import logo from "@/assets/Logo.svg";

export default function Logo() {
  return (
    <div className="flex items-center gap-[8px] sm:gap-[10px] md:gap-[13px]">
      <div className="flex items-center justify-center w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] md:w-[50px] md:h-[50px] bg-(--primary-color) rounded-tl-[8px] rounded-br-[8px] rounded-bl-[12px] rounded-tr-[12px] sm:rounded-tl-[10px] sm:rounded-br-[10px] sm:rounded-bl-[14px] sm:rounded-tr-[14px] md:rounded-tl-[12px] md:rounded-br-[12px] md:rounded-bl-[18px] md:rounded-tr-[18px] shrink-0">
        <Image
          src={logo}
          alt="logo"
          width={32}
          height={16}
          className="w-[20px] h-auto sm:w-[24px] md:w-[32px]"
        />
      </div>
      <p className="text-black text-[14px] sm:text-[16px] md:text-[20px] font-inter font-semibold leading-[100%] truncate">
        NIRO DEV
      </p>
    </div>
  );
}
