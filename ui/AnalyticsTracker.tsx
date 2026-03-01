"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    fetch("/api/analytics/track", { method: "POST" }).catch(() => {});
  }, [pathname]);

  return null;
}
