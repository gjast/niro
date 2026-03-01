"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Label from "@/ui/Label";
import arrow from "@/assets/arrow.svg";
import Button from "@/ui/Button";
import arrowLine from "@/assets/arrow.png";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const key = el.getAttribute("data-hero");

          if (key === "img") {
            gsap.to(el, { opacity: 1, y: 0, ...ANIMATION.header.to });
          } else if (key === "left") {
            const items = el.querySelectorAll<HTMLElement>(".hero-left-item");
            const tl = gsap.timeline({ ease: ANIMATION.header.to.ease });
            tl.to(el, { opacity: 1, x: 0, duration: ANIMATION.header.to.duration }).to(
              items,
              { opacity: 1, y: 0, duration: ANIMATION.stagger.duration, stagger: ANIMATION.stagger.stagger },
              "-=0.25"
            );
          } else if (key === "right") {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              duration: ANIMATION.secondary.to.duration,
              delay: ANIMATION.secondary.to.delay,
              ease: ANIMATION.secondary.to.ease,
            });
          }
          observer.unobserve(el);
        });
      },
      ANIMATION.observer
    );

    const refs = [imgRef, leftRef, rightRef];
    refs.forEach((ref) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="Hero"
      className="MaxContainerWidth MaxContainerPadding flex flex-col items-center justify-center border-l border-r border-(--border-color) mx-auto gap-[30px] md:gap-[50px]"
    >
      <div ref={imgRef} data-hero="img" className="hero-reveal-img w-full">
        <Image
          src={"/imgs/hero.png"}
          alt="hero"
          width={1200}
          height={670}
          priority
          className="w-full h-auto rounded-tl-[30px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[60px] md:rounded-tl-[60px] md:rounded-tr-[30px] md:rounded-bl-[30px] md:rounded-br-[120px]"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-[30px] md:gap-[101px]">
        <div ref={leftRef} data-hero="left" className="md:flex-2 hero-reveal-left">
          <div className="hero-left-item">
            <Label>
              <p className="ml-[18px]">Fullstack developer</p>
              <div className="flex items-center justify-center w-[31px] h-[31px] bg-(--black-color-2) rounded-full cursor-pointer border border-[#B5B8C01A] mr-[4px]">
                <Image src={arrow} alt="arrow" width={16} height={16} />
              </div>
            </Label>
          </div>

          <h1 className="hero-left-item font-medium text-[28px] sm:text-[36px] md:text-[48px] leading-[120%] tracking-[-2%] text-(--black-color) mt-[20px] mb-[24px] md:mt-[30px] md:mb-[40px]">
            Создаём цифровые продукты,
            <br />
            <span className="opacity-60">которые работают на результат</span>
          </h1>

          <div className="hero-left-item">
            <Button>
              <p className="text-[14px] md:text-[16px] font-medium leading-[100%] tracking-0 px-[20px] py-[14px] md:px-[24px] md:py-[16px]">
                Заказать разработку
              </p>
            </Button>
          </div>
        </div>

        <div ref={rightRef} data-hero="right" className="flex md:flex-1 flex-col items-start md:items-end justify-center gap-[12px] md:gap-[20px] hero-reveal-right">
          <Image src={arrowLine} alt="hero-2" width={38} height={31} priority className="hidden md:block" />
          <p className="text-[#6C6C6C] text-[15px] md:text-[18px] font-regular leading-[24px] md:leading-[28px] tracking-0 text-left md:text-right text-balance">
            Проектируем и разрабатываем современные веб-интерфейсы — быстрые,
            удобные и адаптированные под задачи вашего бизнеса
          </p>
        </div>
      </div>
    </div>
  );
}
