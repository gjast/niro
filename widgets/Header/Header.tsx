"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/ui/Logo";
import Link from "next/link";
import { useDictionary } from "@/i18n/DictionaryProvider";

type LinkKey = "hero" | "portfolio" | "roadmap" | "reviews" | "faq";

const links: { href: string; key: LinkKey }[] = [
  { href: "#Hero", key: "hero" },
  { href: "#Portfolio", key: "portfolio" },
  { href: "#Roadmap", key: "roadmap" },
  { href: "#Reviews", key: "reviews" },
  { href: "#Faq", key: "faq" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 20,
    },
  },
};

const menuContainer = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto" as const,
    transition: {
      height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
      opacity: { duration: 0.25 },
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
      opacity: { duration: 0.25, delay: 0.1 },
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: "afterChildren" as const,
    },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  },
};

const menuButton = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 20, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.15 },
  },
};

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-[24px] h-[18px] flex flex-col justify-between">
      <motion.span
        className="block h-[2px] w-full bg-(--black-color) rounded-full origin-left"
        animate={open ? { rotate: 45, y: -1 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-[2px] w-full bg-(--black-color) rounded-full"
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-[2px] w-full bg-(--black-color) rounded-full origin-left"
        animate={open ? { rotate: -45, y: 1 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function Header({
  children,
  runEntranceAnimation = true,
}: {
  children: React.ReactNode;
  runEntranceAnimation?: boolean;
}) {
  const dict = useDictionary();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.div
        className="absolute flex items-center justify-between w-full left-1/2 -translate-x-1/2 md:px-[30px] px-[15px] h-[90px] rounded-full"
        initial={runEntranceAnimation ? { opacity: 0, y: -36 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 22,
          opacity: { duration: 0.4 },
        }}
      >
        <motion.div
          variants={container}
          initial={runEntranceAnimation ? "hidden" : "show"}
          animate="show"
          className="flex items-center justify-between w-full"
        >
          <motion.div variants={item}>
            <Logo />
          </motion.div>

          <motion.nav variants={item} className="hidden lg:block">
            <ul className="flex items-center gap-[35px]">
              {links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-black/60 text-[14px] font-medium leading-[100%] tracking-[0.2px] hover:text-(--primary-color) transition-all duration-300 ease-in-out"
                  >
                    {dict.header.links[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={item} className="hidden lg:flex items-center gap-[10px]">
            {children}
          </motion.div>

          <motion.button
            variants={item}
            className="lg:hidden flex items-center justify-center w-[48px] h-[48px]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <BurgerIcon open={menuOpen} />
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-[90px] left-0 w-full z-40 overflow-hidden lg:hidden"
            variants={menuContainer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="bg-background border-b border-(--border-color) px-[30px] pb-[24px] pt-[8px]">
              <nav>
                <ul className="flex flex-col gap-[4px]">
                  {links.map((link) => (
                    <motion.li key={link.key} variants={menuItem}>
                      <Link
                        href={link.href}
                        className="block py-[12px] text-[16px] font-medium leading-[100%] tracking-[0.2px] text-black/60 hover:text-(--primary-color) transition-colors duration-300 text-right"
                        onClick={() => setMenuOpen(false)}
                      >
                        {dict.header.links[link.key]}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div variants={menuButton} className="mt-[16px] flex justify-end">
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
