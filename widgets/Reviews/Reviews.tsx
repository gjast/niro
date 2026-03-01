"use client";

import React, { useRef, useEffect } from "react";
import Label from "@/ui/Label";
import type { Review } from "@/lib/reviews";
import ReviewsGrid from "./ReviewsGrid";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";
import { useDictionary } from "@/i18n/DictionaryProvider";

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const dict = useDictionary();
  const headerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.set(el, ANIMATION.header.from);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(el, { opacity: 1, y: 0, ...ANIMATION.header.to });
        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="Reviews" className="MaxContainerWidth MaxContainerPadding flex flex-col border-l border-r border-(--border-color) mx-auto gap-[24px] md:gap-[40px]">
      <div ref={headerRef} className="flex flex-col">
        <Label>
          <p className="px-[18px] py-[9px]">{dict.reviews.label}</p>
        </Label>

        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-semibold leading-[120%] tracking-[-2%] mt-[20px] md:mt-[30px] mb-[10px] md:mb-[15px]">
          {dict.reviews.title}
        </h2>

        <p className="text-[#6C6C6C] text-[14px] sm:text-[16px] md:text-[18px] font-regular leading-[140%] md:leading-[100%] tracking-0 max-w-[500px]">
          {dict.reviews.description}
        </p>
      </div>

      <ReviewsGrid reviews={reviews} />
    </div>
  );
}
