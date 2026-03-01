"use client";

import React, { useRef, useEffect } from "react";
import FaqItem from "@/ui/FaqItem";
import gsap from "gsap";
import { ANIMATION } from "@/lib/animationConfig";

const faqData = [
  {
    question: "Сколько времени занимает разработка проекта?",
    answer:
      "Срок зависит от сложности и объёма задач. В среднем лендинг или небольшой сайт занимает 2–4 недели, более сложные продукты — от 1 до 3 месяцев.",
  },
  {
    question: "Как строится процесс работы?",
    answer:
      "Мы начинаем с созвона и брифа, затем согласуем структуру и дизайн, после чего переходим к разработке, тестированию и запуску. На каждом этапе вы видите прогресс и можете вносить правки.",
  },
  {
    question: "Помогаете ли вы с поддержкой после запуска?",
    answer:
      "Да, я могу взять проект на техническую поддержку: фиксить баги, вносить небольшие правки и развивать функциональность по мере необходимости.",
  },
  {
    question: "Можно ли начать с небольшого пилотного проекта?",
    answer:
      "Да, мы можем начать с маленькой задачи или MVP, чтобы вы оценили подход к работе, качество и скорость, а затем масштабировать решение.",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector<HTMLElement>("[data-faq='header']");
    const items = section.querySelectorAll<HTMLElement>("[data-faq='item']");

    gsap.set(header, ANIMATION.header.from);
    gsap.set(items, ANIMATION.secondary.from);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const h = section.querySelector<HTMLElement>("[data-faq='header']");
        const list = section.querySelectorAll<HTMLElement>("[data-faq='item']");

        const tl = gsap.timeline({ ease: ANIMATION.header.to.ease });
        if (h) tl.to(h, { opacity: 1, y: 0, ...ANIMATION.header.to });
        if (list.length) {
          tl.to(
            list,
            {
              opacity: 1,
              y: 0,
              duration: ANIMATION.stagger.duration,
              stagger: ANIMATION.stagger.stagger,
            },
            ANIMATION.header.to.duration + (ANIMATION.secondary.to.delay ?? 0)
          );
        }
        observer.disconnect();
      },
      ANIMATION.observer
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="Faq"
      className="MaxContainerWidth MaxContainerPadding flex flex-col border-l border-r border-(--border-color) mx-auto gap-[24px] md:gap-[40px]"
    >
      <div data-faq="header" className="items-center flex flex-col">
        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-medium leading-[120%] tracking-[-2%] text-center max-w-[800px]">
          Часто задаваемые вопросы
        </h2>
        <p className="text-[#6C6C6C] text-[14px] sm:text-[16px] md:text-[18px] font-regular leading-[140%] md:leading-[100%] tracking-0 text-center mt-[10px] md:mt-[15px]">
          Ответы на популярные вопросы о работе и формате сотрудничества.
        </p>
      </div>

      <div className="flex flex-col gap-[10px] md:gap-[15px] max-w-[800px] w-full mx-auto">
        {faqData.map((item, index) => (
          <div key={index} data-faq="item">
            <FaqItem question={item.question} answer={item.answer} />
          </div>
        ))}
      </div>
    </div>
  );
}
