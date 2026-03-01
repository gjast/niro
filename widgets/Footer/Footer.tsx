import React from "react";
import Link from "next/link";

const socialLinks = [
  { label: "Telegram", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Pinterest", href: "#" },
];

const linkClass =
  "text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-[100%] tracking-[0.2px] text-black/60 hover:text-(--primary-color) transition-all duration-300 ease-in-out";

export default function Footer() {
  return (
    <footer className="MaxContainerWidth MaxContainerPadding flex flex-col-reverse sm:flex-row items-center justify-between gap-[16px] sm:gap-0 border-l border-r border-(--border-color) mx-auto py-5 sm:py-6">
      <p className="text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[100%] tracking-[-2%] text-center sm:text-left order-2 sm:order-1">
        Fullstack developer
      </p>
      <nav className="order-1 sm:order-2">
        <ul className="flex items-center justify-center flex-wrap gap-[8px] sm:gap-[10px]">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
