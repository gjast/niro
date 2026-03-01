"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import PortfolioCarousel from "@/ui/PortfolioCarousel";
import Button from "@/ui/Button";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";

const portfolioItems = [
  {
    image: "/imgs/portfolio1.png",
    title: "An online store for creating MRZ, barcodes, and much more",
    description:
      "A fully-fledged full-stack website with a payment system, authorisation, admin panel, generators",
    tags: ["React", "NextJS", "Tailwind", "PostgreSQL"],
  },
  {
    image: "/imgs/portfolio1.png",
    title: "Corporate dashboard for real-time analytics",
    description:
      "Interactive dashboard with charts, filters and role-based access control",
    tags: ["React", "TypeScript", "Zustand", "NestJS"],
  },
  {
    image: "/imgs/portfolio1.png",
    title: "Telegram bot for automated customer support",
    description:
      "Multi-language bot with AI-powered responses and CRM integration",
    tags: ["grammY", "FastAPI", "PostgreSQL"],
  },
  {
    image: "/imgs/portfolio1.png",
    title: "Landing page for a Web3 startup",
    description:
      "High-conversion landing with wallet connect and NFT gallery",
    tags: ["React", "Web3", "GSAP", "Motion"],
  },
  {
    image: "/imgs/portfolio1.png",
    title: "E-commerce platform with payment integration",
    description:
      "Full-stack marketplace with Stripe payments, reviews and admin panel",
    tags: ["NextJS", "Tailwind", "NestJS", "PostgreSQL"],
  },
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = portfolioItems[activeIndex];
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector<HTMLElement>("[data-portfolio='header']");
    const carousel = section.querySelector<HTMLElement>("[data-portfolio='carousel']");

    if (header) gsap.set(header, ANIMATION.header.from);
    if (carousel) gsap.set(carousel, ANIMATION.secondary.from);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const h = section.querySelector<HTMLElement>("[data-portfolio='header']");
        const c = section.querySelector<HTMLElement>("[data-portfolio='carousel']");

        if (h) gsap.to(h, { opacity: 1, y: 0, ...ANIMATION.header.to });
        if (c) gsap.to(c, { opacity: 1, y: 0, ...ANIMATION.secondary.to });
        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="Portfolio" className="overflow-hidden">
      <div
        ref={sectionRef}
        className="MaxContainerWidth MaxContainerPadding items-center flex flex-col border-l border-r border-(--border-color) mx-auto gap-[24px] md:gap-[40px]"
      >
        <div
          data-portfolio="header"
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-[24px] sm:text-[30px] md:text-[36px] text-center font-medium leading-[120%] tracking-[-2%]">
            Прозрачность работ
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center mt-[10px] md:mt-[15px] font-regular leading-[140%] md:leading-[100%] tracking-0 text-[#6C6C6C]">
            Вы можете ознакомится с примером моих работ в профиле
          </p>
        </div>

        <div className="flex flex-col items-center gap-[16px] md:gap-[25px] w-full">
          <div
            data-portfolio="carousel"
            className="flex flex-col items-center relative w-full"
          >
            <Image
              src={"/imgs/bg.png"}
              alt="portfolio"
              width={1016}
              height={541}
              className="w-full h-auto hidden md:block"
            />
            <div className="relative md:absolute md:bottom-0 md:left-0 w-full">
              <PortfolioCarousel
                images={portfolioItems.map((item) => item.image)}
                onSlideChange={setActiveIndex}
              />
            </div>
          </div>

          <div className="relative min-h-[100px] md:min-h-[120px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-[18px] sm:text-[20px] md:text-[24px] text-center font-medium leading-[120%] md:leading-[100%] tracking-0">
                  {current.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] md:text-[16px] font-regular leading-[140%] md:leading-[100%] tracking-[-2%] text-[#6C6C6C] text-center mt-[10px] md:mt-[15px] mb-[20px] md:mb-[30px]">
                  {current.description}
                </p>

                <div className="flex items-center justify-center gap-[6px] md:gap-[10px] flex-wrap">
                  {current.tags.map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.25,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <Button>
                        <p className="text-[13px] md:text-[16px] font-medium leading-[100%] tracking-[-2%] px-[12px] py-[5px] md:px-[16px] md:py-[6px]">
                          {tag}
                        </p>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
