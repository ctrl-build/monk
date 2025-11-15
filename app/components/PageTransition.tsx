"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "wiping-in" | "wiping-out">("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const isInitialLoad = useRef(true);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      previousPathname.current = pathname;
      return;
    }

    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;

    setPhase("wiping-in");

    const wipeInComplete = setTimeout(() => {
      setDisplayChildren(children);
      setPhase("wiping-out");
    }, 250);

    const wipeOutComplete = setTimeout(() => {
      setPhase("idle");
    }, 500);

    return () => {
      clearTimeout(wipeInComplete);
      clearTimeout(wipeOutComplete);
    };
  }, [pathname, children]);

  useEffect(() => {
    if (phase === "idle") {
      setDisplayChildren(children);
    }
  }, [children, phase]);

  return (
    <>
      {phase !== "idle" && (
        <div
          className="fixed inset-0 z-[99] bg-[#fdfcfb] pointer-events-none"
          style={{
            transform:
              phase === "wiping-in"
                ? "translateX(0%)"
                : phase === "wiping-out"
                ? "translateX(100%)"
                : "translateX(-100%)",
            transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            animation:
              phase === "wiping-in"
                ? "wipeIn 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : phase === "wiping-out"
                ? "wipeOut 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : "none",
          }}
        />
      )}
      <div>{displayChildren}</div>
    </>
  );
}

