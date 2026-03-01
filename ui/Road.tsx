"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";

export default function Road({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const numberEl = root.querySelector<HTMLElement>("[data-road-number]");
    const textEl = root.querySelector<HTMLElement>("[data-road-text]");
    const card = root.closest<HTMLElement>("[data-roadmap='card']");
    const index = card ? parseInt(card.getAttribute("data-card-index") ?? "0", 10) : 0;
    const delay = 0.5 + index * ANIMATION.stagger.stagger;

    gsap.set(numberEl, { scale: 0 });
    gsap.set(textEl, { opacity: 0, y: 24 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const num = root.querySelector<HTMLElement>("[data-road-number]");
        const txt = root.querySelector<HTMLElement>("[data-road-text]");

        const tl = gsap.timeline({ ease: ANIMATION.inner.ease, delay });
        if (num) {
          tl.to(num, { scale: 1, duration: 0.45, ease: "back.out(1.4)" });
        }
        if (txt) {
          tl.to(txt, { opacity: 1, y: 0, duration: ANIMATION.inner.duration }, "-=0.2");
        }
        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex flex-col p-[10px] border border-(--border-color) rounded-[22px] bg-(--gray-color) min-h-[320px] h-full"
    >
      <div className="flex flex-1 w-full flex-col justify-between relative bg-white rounded-[18px] min-h-0 overflow-hidden">
        <div
          data-road-number
          className="flex items-center justify-center w-[39px] h-[39px] bg-(--gray-color) border border-(--border-color) text-[16px] font-medium leading-[100%] tracking-[-2%] rounded-full md:mt-[30px] mt-[15px] md:ml-[30px] ml-[15px] z-3"
        >
          {number}
        </div>

        <div className="z-1 absolute top-0 left-0 w-full h-full">{children}</div>

        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-linear-to-t from-white to-transparent z-2" />

        <div
          data-road-text
          className="flex flex-col gap-[12px] md:ml-[30px] ml-[15px] md:mb-[30px] mb-[15px] z-3"
        >
          <h4 className="text-[20px] font-semibold leading-[100%] tracking-[-2%]">
            {title}
          </h4>
          <p className="text-[16px] font-regular leading-[150%] tracking-0 text-[#6C6C6C]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
