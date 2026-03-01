"use client";

import React, { useRef, useEffect } from "react";
import Road from "../Road";
import Image from "next/image";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";
import { useDictionary } from "@/i18n/DictionaryProvider";

export default function Step3() {
  const dict = useDictionary();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const wrap = imgWrapRef.current;
    if (!wrap) return;

    const card = wrap.closest<HTMLElement>("[data-roadmap='card']");
    const index = card ? parseInt(card.getAttribute("data-card-index") ?? "0", 10) : 0;
    const delay =
      ANIMATION.header.to.duration +
      (ANIMATION.secondary.to.delay ?? 0) +
      index * ANIMATION.stagger.stagger;

    gsap.set(wrap, { x: 48, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(wrap, {
          x: 0,
          opacity: 1,
          duration: ANIMATION.inner.duration,
          delay,
          ease: ANIMATION.inner.ease,
        });
        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full">
      <Road number={3} title={dict.roadmap.steps[2].title} description={dict.roadmap.steps[2].description}>
        <div ref={imgWrapRef} className="absolute top-[30px] right-0">
          <Image src="/imgs/RoadMap/develop.png" alt="develop" width={205} height={228} />
        </div>
      </Road>
    </div>
  );
}
