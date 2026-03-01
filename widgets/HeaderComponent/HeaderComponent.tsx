import React from "react";
import Header from "../Header/Header";
import { HeaderButton } from "../Header/HeaderButton";

export default function HeaderComponent({
  runEntranceAnimation = true,
}: {
  runEntranceAnimation?: boolean;
}) {
  return (
    <div className="border-b border-(--border-color) w-full h-[90px]">
      <div className="border-l border-r border-(--border-color) MaxContainerWidth h-[90px] mx-auto relative">
        <Header runEntranceAnimation={runEntranceAnimation}>
          <HeaderButton />
        </Header>
      </div>
    </div>
  );
}
