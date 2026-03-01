"use client";

import React, { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "drag";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const posRef = useRef({ x: -50, y: -50 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function update() {
      if (ref.current) {
        const { x, y } = posRef.current;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      rafRef.current = requestAnimationFrame(update);
    }
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;

      if (target.closest("[data-cursor-drag]")) {
        setState("drag");
      } else if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor-hover], .cursor-pointer"
        )
      ) {
        setState("hover");
      } else {
        setState("default");
      }
    }

    function onMouseLeave() {
      setVisible(false);
    }

    function onMouseEnter() {
      setVisible(true);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [visible]);

  const scale = state === "drag" ? 64 / 20 : state === "hover" ? 12 / 20 : 1;

  return (
    <div
      ref={ref}
      className="fixed z-[9999] pointer-events-none hidden md:block"
      style={{
        top: -10,
        left: -10,
        width: 20,
        height: 20,
        opacity: visible ? 1 : 0,
        willChange: "transform",
      }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          transform: `scale(${scale})`,
          backgroundColor:
            state === "drag" || state === "hover"
              ? "#1558E4"
              : "rgba(21, 88, 228, 0.3)",
        }}
      >
        {state === "drag" && (
          <span
            className="text-white font-bold leading-0 flex items-center justify-center select-none uppercase"
            style={{ fontSize: `${12 / scale}px` }}
          >
            DRAG
          </span>
        )}
      </div>
    </div>
  );
}
