"use client";

import React, { useRef, useEffect } from "react";
import Label from "@/ui/Label";
import StackCart from "@/ui/StackCart";
import KeyboardTilt from "./KeyboardTilt";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";

interface StackItem {
  text?: string;
  description?: string;
  icon?: string;
  padding?: boolean;
  placeholder?: boolean;
}

const stackItems: StackItem[] = [
  { text: "React", description: "Frontend", icon: "/imgs/Stack/React.png", padding: true },
  { text: "NextJS", description: "Frontend", icon: "/imgs/Stack/nextjs.png" },
  { text: "tailwind", description: "Frontend", icon: "/imgs/Stack/tailwind.png", padding: true },
  { text: "Sass", description: "Frontend", icon: "/imgs/Stack/sass.png" },
  { text: "zustand", description: "Frontend", icon: "/imgs/Stack/zustand.png", padding: true },
  { text: "gsap", description: "Frontend", icon: "/imgs/Stack/gsap.png", padding: true },
  { text: "motion", description: "Frontend", icon: "/imgs/Stack/motion.png" },
  { placeholder: true },
  { placeholder: true },
  { placeholder: true },
  { placeholder: true },
  { text: "web3", description: "Frontend", icon: "/imgs/Stack/web3.png", padding: true },
  { placeholder: true },
  { text: "FastAPI", description: "Backend", icon: "/imgs/Stack/fastapi.png" },
  { text: "PostgreSQL", description: "Backend", icon: "/imgs/Stack/postgresql.png", padding: true },
  { text: "NestJS", description: "Backend", icon: "/imgs/Stack/nestjs.svg", padding: true },
  { text: "grammY", description: "Backend", icon: "/imgs/Stack/grammy.svg", padding: true },
  { placeholder: true },
];

export default function Stack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const header = section.querySelector<HTMLElement>("[data-stack='header']");
    const keyboard = section.querySelector<HTMLElement>("[data-stack='keyboard']");
    const cards = section.querySelectorAll<HTMLElement>("[data-stack='card']");

    gsap.set(header, ANIMATION.header.from);
    gsap.set(keyboard, ANIMATION.secondary.from);
    gsap.set(cards, ANIMATION.secondary.from);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const h = section.querySelector<HTMLElement>("[data-stack='header']");
        const k = section.querySelector<HTMLElement>("[data-stack='keyboard']");
        const c = section.querySelectorAll<HTMLElement>("[data-stack='card']");

        if (h) gsap.to(h, { opacity: 1, y: 0, ...ANIMATION.header.to });
        if (k) gsap.to(k, { opacity: 1, y: 0, ...ANIMATION.secondary.to });
        if (c.length) {
          gsap.to(c, {
            opacity: 1,
            y: 0,
            duration: ANIMATION.stagger.duration,
            stagger: ANIMATION.stagger.stagger,
            delay: ANIMATION.secondary.to.delay,
            ease: ANIMATION.stagger.ease,
          });
        }
        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="MaxContainerWidth MaxContainerPadding flex flex-col border-l border-r border-(--border-color) mx-auto gap-[30px] md:gap-[50px]">
      <div data-stack="header" className="flex flex-col gap-[10px] md:gap-[15px]">
        <Label>
          <p className="mx-[18px] my-[9px]">Наш стек технологий</p>
        </Label>
        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-medium leading-[120%] tracking-[-2%]">
          Используем современные технологии
        </h2>
        <p className="text-[#6C6C6C] text-[14px] sm:text-[16px] md:text-[18px] font-regular leading-[140%] md:leading-[100%] tracking-0">
          Чтобы создавать быстрые, масштабируемые сайты с высокой конверсией.
        </p>
      </div>

      <div className="relative">
        <KeyboardTilt containerRef={containerRef} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[8px] sm:gap-[14px] md:gap-[22px] relative">
          {stackItems.map((item, index) =>
            item.placeholder ? (
              <div key={index} className="hidden xl:block">
                <StackCart text="" description="" />
              </div>
            ) : (
              <div key={index} data-stack="card">
                <StackCart
                  text={item.text!}
                  description={item.description!}
                  icon={item.icon}
                  padding={item.padding}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
