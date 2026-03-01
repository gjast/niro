"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface PortfolioCarouselProps {
  images: string[];
  onSlideChange?: (index: number) => void;
}

const SIDE_SCALE = 717 / 834;
const MD_BREAKPOINT = 768;

export default function PortfolioCarousel({ images, onSlideChange }: PortfolioCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MD_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const startIndex = Math.floor(images.length / 2);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    startIndex,
    containScroll: isMobile ? "trimSnaps" : false,
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    onSlideChange?.(idx);
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, isMobile]);

  return (
    <div className="w-full md:w-screen md:relative md:left-[50%] md:-translate-x-[50%] overflow-hidden" data-cursor-drag>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex items-center">
          {images.map((src, i) => {
            const isCenter = i === selectedIndex;
            return (
              <div
                key={i}
                className="shrink-0 px-[6px] md:px-[10px] w-full md:w-[834px]"
              >
                <div
                  className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-center"
                  style={{
                    transform: !isMobile && !isCenter ? `scale(${SIDE_SCALE})` : "scale(1)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`portfolio ${i + 1}`}
                    width={834}
                    height={469}
                    className="w-full h-auto rounded-[12px] md:rounded-[18px] object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
