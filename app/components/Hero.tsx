"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [revealedWordCount, setRevealedWordCount] = useState(0);
  const [periodColor, setPeriodColor] = useState("#3e2723");
  const [revealedLineCount, setRevealedLineCount] = useState(0);
  const [showScrollLine, setShowScrollLine] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headline = "We build with intention.";
  const words = headline.split(" ");
  const manifesto = "Monk is a studio for focused craft. We create digital experiences with discipline, clarity, and an uncompromising commitment to the work. Our process is the product.";
  const lines = manifesto.split(". ").map((line, i, arr) => 
    i === arr.length - 1 ? line : line + "."
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsLoaded(true);
      setRevealedWordCount(words.length);
      setPeriodColor("#f0660a");
      setRevealedLineCount(lines.length);
      setShowScrollLine(true);
      return;
    }

    if (!isLoaded) return;

    const startAnimations = () => {
      let frameId: number;
      let startTime: number | null = null;
      let wordIndex = 0;
      let lineIndex = 0;
      let periodChanged = false;
      let scrollLineShown = false;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;

        if (wordIndex < words.length && elapsed >= wordIndex * 150) {
          setRevealedWordCount(wordIndex + 1);
          wordIndex++;
        }

        if (wordIndex === words.length && !periodChanged && elapsed >= (words.length - 1) * 150 + 400) {
          setPeriodColor("#f0660a");
          periodChanged = true;
        }

        if (periodChanged && lineIndex < lines.length && elapsed >= (words.length - 1) * 150 + 600 + lineIndex * 200 + 200) {
          setRevealedLineCount(lineIndex + 1);
          lineIndex++;
        }

        if (lineIndex === lines.length && !scrollLineShown && elapsed >= (words.length - 1) * 150 + 600 + lines.length * 200 + 500) {
          setShowScrollLine(true);
          scrollLineShown = true;
          return;
        }

        if (!scrollLineShown) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);

      return () => {
        if (frameId) cancelAnimationFrame(frameId);
      };
    };

    if (window.requestIdleCallback) {
      requestIdleCallback(startAnimations, { timeout: 2000 });
    } else {
      setTimeout(startAnimations, 100);
    }
  }, [isLoaded, isMobile]);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && !isMobile && <Loader onComplete={handleLoaderComplete} />}
      <section className="relative h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 overflow-hidden flex flex-col">
        <div className="grid-12 container mx-auto max-w-[1400px] flex-1 flex flex-col justify-center pt-32 lg:pt-40">
          <div className="col-span-12 lg:col-span-7 lg:col-start-1">
            <h1
              className="text-left text-[8vw] leading-[1.1] text-[#3e2723] md:text-[6vw] lg:text-[5vw]"
              style={{ fontFamily: '"Schnyder", serif' }}
            >
              {words.map((word, index) => {
                const isRevealed = index < revealedWordCount;
                const isLastWord = index === words.length - 1;
                const wordWithoutPeriod = word.replace(".", "");
                const hasPeriod = word.includes(".");
                
                return (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      opacity: isRevealed || !isLoaded ? 1 : 0,
                      transform: isRevealed || !isLoaded ? "translateY(0)" : "translateY(20px)",
                      transition: isLoaded ? "opacity 400ms ease-out, transform 400ms ease-out" : "none",
                      marginRight: index < words.length - 1 ? "0.25em" : "0",
                    }}
                  >
                    {wordWithoutPeriod}
                    {hasPeriod && (
                      <span
                        style={{
                          color: periodColor,
                          transition: "color 150ms ease-out",
                        }}
                      >
                        .
                      </span>
                    )}
                  </span>
                );
              })}
            </h1>
          </div>

          <div className="col-span-12 mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <p
              className="text-left text-[18px] leading-[1.6] text-[#3e2723]"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              {lines.map((line, index) => {
                const isRevealed = index < revealedLineCount;
                return (
                  <span
                    key={index}
                    className="block"
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 400ms ease-out, transform 400ms ease-out",
                    }}
                  >
                    {line}
                    {index < lines.length - 1 && " "}
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center"
          style={{
            opacity: showScrollLine ? 1 : 0,
            transition: "opacity 400ms ease-out",
            pointerEvents: showScrollLine ? "auto" : "none",
          }}
        >
          <div className="relative flex w-full items-center justify-center">
            <div
              className="absolute left-0 h-[1px] bg-[#3e2723] w-full origin-left"
              style={{
                transform: showScrollLine ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 800ms cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: "200ms",
              }}
            />
            <span
              className="relative z-10 bg-[#fdfcfb] px-4 text-[14px] lowercase text-[#3e2723]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              [ scroll ]
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

