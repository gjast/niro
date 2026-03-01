"use client";

import React, { useRef, useEffect } from "react";
import Road from "../Road";
import Image from "next/image";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";
import { useDictionary } from "@/i18n/DictionaryProvider";

export default function Step5() {
  const dict = useDictionary();
  const gridWrapRef = useRef<HTMLDivElement>(null);
  const landingWrapRef = useRef<HTMLDivElement>(null);
  const phoneWrapRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const gridWrap = gridWrapRef.current;
    const landingWrap = landingWrapRef.current;
    const phoneWrap = phoneWrapRef.current;
    if (!gridWrap || !landingWrap || !phoneWrap) return;

    const card = gridWrap.closest<HTMLElement>("[data-roadmap='card']");
    const index = card
      ? parseInt(card.getAttribute("data-card-index") ?? "0", 10)
      : 0;
    const delay =
      ANIMATION.header.to.duration +
      (ANIMATION.secondary.to.delay ?? 0) +
      index * ANIMATION.stagger.stagger;

    gsap.set(gridWrap, { y: 40, opacity: 0 });
    gsap.set(landingWrap, { x: 48, opacity: 0 });
    gsap.set(phoneWrap, { y: 40, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const tl = gsap.timeline({ delay, ease: ANIMATION.inner.ease });
        tl.to(gridWrap, { y: 0, opacity: 1, duration: ANIMATION.inner.duration })
          .to(landingWrap, { x: 0, opacity: 1, duration: ANIMATION.inner.duration }, "-=0.25")
          .to(phoneWrap, { y: 0, opacity: 1, duration: ANIMATION.inner.duration }, "-=0.2");

        observer.disconnect();
      },
      ANIMATION.observer,
    );

    observer.observe(gridWrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full">
      <Road
        number={5}
        title={dict.roadmap.steps[4].title}
        description={dict.roadmap.steps[4].description}
      >
        <div
          ref={gridWrapRef}
          className="absolute top-[30px] left-[50%] -translate-x-1/2"
        >
          <Image
            src="/imgs/RoadMap/NetWork.png"
            alt="grid"
            width={376}
            height={200}
          />
        </div>
        <div
          ref={landingWrapRef}
          className="absolute top-[25px] right-[-12px] sm:right-[25px] z-1"
        >
          <Image
            src="/imgs/RoadMap/Landing.png"
            alt="landing"
            width={310}
            height={208}
						className="w-[220px] h-auto sm:w-[260px] md:w-[310px] md:h-[208px]"
          />
        </div>
        <div ref={phoneWrapRef} className="absolute bottom-0 right-[20%] sm:right-[45%] z-1">
          <Image
            src="/imgs/RoadMap/Phone.png"
            alt="phone"
            width={102}
            height={212}
          />
        </div>
      </Road>
    </div>
  );
}
