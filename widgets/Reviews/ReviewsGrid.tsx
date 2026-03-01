"use client";

import React, { useState, useEffect, useRef } from "react";
import type { Review as ReviewType } from "@/lib/reviews";
import Review from "@/ui/Review";
import Button from "@/ui/Button";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";
import { useDictionary } from "@/i18n/DictionaryProvider";

const SM_BREAKPOINT = 640;
const MD_BREAKPOINT = 768;

interface ReviewsGridProps {
  reviews: ReviewType[];
}

export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
  const dict = useDictionary();
  const [showAll, setShowAll] = useState(false);
  const [columnsCount, setColumnsCount] = useState(3);
  const gridRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const mqlMd = window.matchMedia(`(min-width: ${MD_BREAKPOINT}px)`);
    const mqlSm = window.matchMedia(`(min-width: ${SM_BREAKPOINT}px)`);
    const update = () => {
      if (mqlMd.matches) setColumnsCount(3);
      else if (mqlSm.matches) setColumnsCount(2);
      else setColumnsCount(1);
    };
    update();
    mqlMd.addEventListener("change", update);
    mqlSm.addEventListener("change", update);
    return () => {
      mqlMd.removeEventListener("change", update);
      mqlSm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          if (card.dataset.reviewAnimated === "true") return;
          card.dataset.reviewAnimated = "true";
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: ANIMATION.stagger.duration,
            ease: ANIMATION.stagger.ease,
          });
          observerRef.current?.unobserve(card);
        });
      },
      ANIMATION.observer
    );
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !observerRef.current) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-review-card]");
    cards.forEach((card) => {
      if (card.dataset.reviewAnimated === "true") return;
      gsap.set(card, { ...ANIMATION.secondary.from });
      observerRef.current?.observe(card);
    });
  }, [showAll, columnsCount]);

  const columns = Array.from({ length: columnsCount }, () => [] as ReviewType[]);
  reviews.forEach((item, idx) => {
    columns[idx % columnsCount].push(item);
  });

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const overlay = overlayRef.current;
    if (!grid) return;

    const collapsed = columnsCount === 1 ? 700 : 960;

    if (showAll) {
      grid.style.maxHeight = "none";
      requestAnimationFrame(() => {
        const fullHeight = grid.scrollHeight;
        grid.style.maxHeight = `${collapsed}px`;
        requestAnimationFrame(() => {
          gsap.fromTo(
            grid,
            { maxHeight: collapsed },
            {
              maxHeight: fullHeight,
              duration: 0.7,
              ease: "power2.inOut",
              overwrite: "auto",
            }
          );
        });
      });
      overlay && gsap.to(overlay, { opacity: 0, duration: 0.5, delay: 0.1, ease: "power2.out" });
    } else {
      gsap.to(grid, {
        maxHeight: collapsed,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      overlay && gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });
    }
  }, [showAll, columnsCount]);

  return (
    <>
      <div className="relative">
        <div
          ref={gridRef}
          className={`overflow-hidden ${
            columnsCount === 1
              ? "flex flex-col gap-[10px]"
              : "flex gap-[10px] sm:gap-[14px] md:gap-[19px]"
          }`}
          style={{ maxHeight: columnsCount === 1 ? 700 : 960 }}
        >
          {columnsCount === 1 ? (
            reviews.map((review) => (
              <div key={review.id} data-review-card>
                <Review
                  name={review.name}
                  icon={review.icon}
                  text={review.text}
                  date={review.date}
                />
              </div>
            ))
          ) : (
            columns.map((col, colIdx) => (
              <div key={colIdx} className="flex-1 min-w-0 flex flex-col gap-[10px] sm:gap-[14px] md:gap-[20px]">
                {col.map((review) => (
                  <div key={review.id} data-review-card>
                    <Review
                      name={review.name}
                      icon={review.icon}
                      text={review.text}
                      date={review.date}
                    />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        <div
          ref={overlayRef}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px]"
          style={{
            background: "linear-gradient(to top, var(--background), rgba(245,245,245,0))",
          }}
        />
      </div>
      <div className="flex justify-center mt-[16px] md:mt-[24px]">
        <div
          onClick={() => setShowAll((prev) => !prev)}
          className="cursor-pointer"
        >
          

          <Button>
            <p className="text-[14px] md:text-[16px] font-medium leading-[100%] tracking-[-2%] px-[20px] py-[14px] md:px-[24px] md:py-[16px]">{showAll ? dict.reviews.showLess : dict.reviews.showMore}</p>
          </Button>
        </div>
      </div>
    </>
  );
}

