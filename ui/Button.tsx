"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const MAGNET_STRENGTH = 8;
const HOVER_COLOR = "rgb(42, 111, 214)"; // чуть темнее primary #3982EE

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
}

export default function Button({ children, href }: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    setMagnet({
      x: clamp(dx) * MAGNET_STRENGTH,
      y: clamp(dy) * MAGNET_STRENGTH,
    });
  }

  function handleMouseLeave() {
    setMagnet({ x: 0, y: 0 });
    setHover(false);
  }

  const content = (
    <motion.div
      ref={ref}
      className="flex items-center justify-center rounded-full text-white text-[14px] font-medium leading-[100%] w-max cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: magnet.x,
        y: magnet.y,
        backgroundColor: hover ? HOVER_COLOR : "var(--primary-color)",
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 20 },
        y: { type: "spring", stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.35, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href} className="inline-block">{content}</Link>;
  }
  return content;
}
