"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const SCROLL_THRESHOLD = 400;
const SCROLL_STOP_DELAY = 350;

export default function FloatingHeader() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY ?? document.documentElement.scrollTop;

      if (y <= SCROLL_THRESHOLD) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setVisible(false);
        return;
      }

      setVisible(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setVisible(true);
      }, SCROLL_STOP_DELAY);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-background"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      initial={false}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <HeaderComponent runEntranceAnimation={false} />
    </motion.div>
  );
}
