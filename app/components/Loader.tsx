"use client";

import { useState, useEffect } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"line" | "wipe" | "complete">("line");

  useEffect(() => {
    const lineTimer = setTimeout(() => {
      setPhase("wipe");
    }, 600);

    const wipeTimer = setTimeout(() => {
      setPhase("complete");
      setTimeout(() => {
        onComplete();
      }, 200);
    }, 800);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(wipeTimer);
    };
  }, [onComplete]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] ${
          phase === "line" ? "bg-black" : "bg-[#fdfcfb]"
        }`}
        style={{
          transition: phase === "wipe" ? "background-color 300ms ease-out" : "none",
        }}
      >
        {phase === "line" && (
          <div
            className="absolute top-1/2 left-0 h-[2px] origin-left bg-[#f0660a]"
            style={{
              width: "100%",
              transform: "translateY(-50%) scaleX(0)",
              animation: "burnLine 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
        )}
      </div>
    </>
  );
}

