"use client";

import React, { useRef, useEffect } from "react";
import Road from "../Road";
import Image from "next/image";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";

export default function Step4() {
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const folderWrapRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const gridWrap = gridWrapRef.current;
    const folderWrap = folderWrapRef.current;
    if (!gridWrap || !folderWrap) return;

    const card = gridWrap.closest<HTMLElement>("[data-roadmap='card']");
    const index = card ? parseInt(card.getAttribute("data-card-index") ?? "0", 10) : 0;
    const delay =
      ANIMATION.header.to.duration +
      (ANIMATION.secondary.to.delay ?? 0) +
      index * ANIMATION.stagger.stagger;

    gsap.set(gridWrap, { y: 40, opacity: 0 });
    gsap.set(folderWrap, { x: 48, opacity: 0, rotation: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const tl = gsap.timeline({ delay, ease: ANIMATION.inner.ease });
        tl.to(gridWrap, { y: 0, opacity: 1, duration: ANIMATION.inner.duration })
          .to(
            folderWrap,
            { x: 0, opacity: 1, rotation: 0, duration: ANIMATION.inner.duration },
            "-=0.25"
          );

        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(gridWrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full">
      <Road number={4} title="Сдача проекта" description="Передаём, вносим финальные корректировки.">
        <div ref={gridWrapRef} className="absolute top-[30px] right-[15px] md:right-[30px]">
          <Image src="/imgs/RoadMap/NetWork.png" alt="grid" width={373} height={197} className="w-[200px] h-auto sm:w-[250px] md:w-[373px] md:h-[197px]" />
        </div>
        <div ref={folderWrapRef} className="absolute top-[15px] right-[20px] md:right-[70px] z-1">
          <Image
            src="/imgs/RoadMap/folder.png"
            alt="folder"
            width={231}
            height={189}
            className="w-[140px] h-auto sm:w-[180px] md:w-[231px] md:h-[189px]"
          />
        </div>
      </Road>
    </div>
  );
}
