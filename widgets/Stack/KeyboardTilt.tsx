"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";

const TILT_MAX = 15;

interface KeyboardTiltProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function KeyboardTilt({ containerRef }: KeyboardTiltProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(x * TILT_MAX);
      rotateX.set(-y * TILT_MAX);
    }

    function onMouseLeave() {
      rotateX.set(0);
      rotateY.set(0);
    }

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [containerRef, rotateX, rotateY]);

  return (
    <div
      data-stack="keyboard"
      className="absolute z-10 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 hidden xl:flex pointer-events-none w-[787px] h-[434px]   items-center justify-center"
      style={{ perspective: 1000 }}
    >
      <motion.div style={{ rotateX: springX, rotateY: springY }}>
        <Image
          src="/imgs/keyboard.png"
          alt="keyboard"
          width={787}
          height={434}
          draggable={false}
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
}
