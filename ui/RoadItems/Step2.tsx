"use client";

import React, { useRef, useEffect } from "react";
import Road from "../Road";
import Image from "next/image";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";
import { useDictionary } from "@/i18n/DictionaryProvider";

export default function Step2({ width }: { width?: number }) {
  const dict = useDictionary();
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const holdWrapRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const gridWrap = gridWrapRef.current;
    const holdWrap = holdWrapRef.current;
    if (!gridWrap || !holdWrap) return;

    const card = gridWrap.closest<HTMLElement>("[data-roadmap='card']");
    const index = card ? parseInt(card.getAttribute("data-card-index") ?? "0", 10) : 0;
    const delay =
      ANIMATION.header.to.duration +
      (ANIMATION.secondary.to.delay ?? 0) +
      index * ANIMATION.stagger.stagger;

    gsap.set(gridWrap, { y: 40, opacity: 0 });
    gsap.set(holdWrap, { x: 48, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const tl = gsap.timeline({ delay, ease: ANIMATION.inner.ease });
        tl.to(gridWrap, { y: 0, opacity: 1, duration: ANIMATION.inner.duration })
          .to(holdWrap, { x: 0, opacity: 1, duration: ANIMATION.inner.duration }, "-=0.25");

        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(gridWrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full" style={width != null ? { width: `${width}px`, minWidth: `${width}px` } : undefined}>
      <Road number={2} title={dict.roadmap.steps[1].title} description={dict.roadmap.steps[1].description}>
        <div ref={gridWrapRef} className="absolute top-0 left-0 w-full h-full">
          <Image src="/imgs/RoadMap/NetWork.png" alt="grid" fill className="pt-[30px] px-[30px]" />
        </div>
        <div ref={holdWrapRef} className="absolute top-[40%] left-0 w-full px-[15px] sm:px-[30px] -translate-y-1/2">
          <Image
            src="/imgs/RoadMap/Hold.png"
            alt="hold"
            width={376}
            height={66}
            className="w-full h-auto object-contain sm:w-[376px] sm:h-[66px]"
          />
        </div>
      </Road>
    </div>
  );
}
