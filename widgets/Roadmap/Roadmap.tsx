"use client";

import Button from "@/ui/Button";
import React, { useRef, useEffect } from "react";
import { useDictionary } from "@/i18n/DictionaryProvider";
import Step1 from "@/ui/RoadItems/Step1";
import Step2 from "@/ui/RoadItems/Step2";
import Step3 from "@/ui/RoadItems/Step3";
import Step4 from "@/ui/RoadItems/Step4";
import Step5 from "@/ui/RoadItems/Step5";
import gsap from "gsap";

export default function Roadmap() {
  const dict = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector<HTMLElement>("[data-roadmap='header']");
    const cards = section.querySelectorAll<HTMLElement>("[data-roadmap='card']");

    gsap.set(header, { opacity: 0, y: 56 });
    gsap.set(cards, { opacity: 0, y: 32 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const h = section.querySelector<HTMLElement>("[data-roadmap='header']");
        const c = section.querySelectorAll<HTMLElement>("[data-roadmap='card']");

        const tl = gsap.timeline({ ease: "power2.out" });
        if (h) tl.to(h, { opacity: 1, y: 0, duration: 0.7 });
        if (c.length) {
          tl.to(c, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.7");
        }
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="Roadmap"
      className="MaxContainerWidth MaxContainerPadding flex flex-col border-l border-r border-(--border-color) mx-auto gap-[40px]"
    >
      <div data-roadmap="header" className="flex flex-col items-center">
        <Button>
          <p className="text-[16px] font-medium leading-[100%] tracking-[-2%] px-[18px] py-[9px]">{dict.roadmap.button}</p>
        </Button>
        <h3 className="text-[24px] sm:text-[36px] text-center font-semibold leading-[120%] tracking-[-2%] mt-[20px] sm:mt-[30px] text-balance">
          {dict.roadmap.title}
        </h3>
        <p className="text-[14px] sm:text-[18px] text-center font-regular text-[#6C6C6C] leading-[100%] tracking-0 mt-[10px] sm:mt-[15px]">
          {dict.roadmap.subtitle}
        </p>
      </div>

      {/* Телефон: 1 карточка в ряд. Планшет: 2+1+2. Десктоп: 3+2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:hidden">
        <div data-roadmap="card" data-card-index="0" className="w-full min-w-0">
          <Step1 />
        </div>
        <div data-roadmap="card" data-card-index="1" className="w-full min-w-0">
          <Step2 />
        </div>
        <div data-roadmap="card" data-card-index="2" className="w-full md:col-span-2 min-w-0">
          <Step3 />
        </div>
        <div data-roadmap="card" data-card-index="3" className="w-full min-w-0">
          <Step4 />
        </div>
        <div data-roadmap="card" data-card-index="4" className="w-full min-w-0">
          <Step5 />
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-[20px]">
        <div className="flex flex-row gap-[20px]">
          <div data-roadmap="card" data-card-index="5" className="w-auto flex-shrink-0">
            <Step1 width={387} />
          </div>
          <div data-roadmap="card" data-card-index="6" className="w-auto flex-shrink-0">
            <Step2 width={409} />
          </div>
          <div data-roadmap="card" data-card-index="7" className="flex-1 min-w-0">
            <Step3 />
          </div>
        </div>
        <div className="flex flex-row gap-[20px]">
          <div data-roadmap="card" data-card-index="8" className="flex-1 min-w-0">
            <Step4 />
          </div>
          <div data-roadmap="card" data-card-index="9" className="flex-1 min-w-0">
            <Step5 />
          </div>
        </div>
      </div>
    </div>
  );
}
