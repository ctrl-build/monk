"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

interface Discipline {
  id: string;
  title: string;
  description: string;
}

const disciplines: Discipline[] = [
  {
    id: "design",
    title: "Design",
    description: "We design systems, not just pages. It is an act of architecture, clarity, and intentionality. We build the framework that gives the content its power.",
  },
  {
    id: "development",
    title: "Development",
    description: "Code is craft. We write clean, intentional, and performant systems. Every line serves a purpose. Every interaction is deliberate.",
  },
  {
    id: "strategy",
    title: "Strategy",
    description: "We begin with the why. Strategy is the discipline of asking the right questions, defining the essential, and building the path to clarity.",
  },
];

export default function Studio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [spineLetters, setSpineLetters] = useState<string[]>([]);
  const [expandedDiscipline, setExpandedDiscipline] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const word = "studio";
      word.split("").forEach((letter, index) => {
        setTimeout(() => {
          setSpineLetters((prev) => [...prev, letter]);
        }, index * 100 + 200);
      });
    }
  }, [isLoaded]);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  const handleDisciplineClick = (id: string) => {
    setExpandedDiscipline(expandedDiscipline === id ? null : id);
  };

  return (
    <>
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}
      <section
        ref={pageRef}
        className="relative min-h-screen bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 py-32"
      >
        {isDesktop && (
          <div
            className="fixed left-4 lg:left-8 xl:left-16 top-1/2 -translate-y-1/2 z-10"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            <div
              className="text-[18px] lowercase text-[#3e2723]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {spineLetters.map((letter, index) => (
                <span
                  key={index}
                  style={{
                    opacity: spineLetters.includes(letter) ? 1 : 0,
                    transition: "opacity 200ms ease-out",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-[1400px]">
          {isDesktop ? (
            <div className="grid-12 mb-32">
              <div className="col-span-12 md:col-span-8 md:col-start-1">
                <h1
                  className="text-[8vw] leading-[1.1] text-[#3e2723]"
                  style={{ fontFamily: '"Schnyder", serif' }}
                >
                  Our{" "}
                  <span style={{ color: "#f0660a" }}>discipline</span> is our
                  freedom.
                </h1>
              </div>
              <div className="col-span-12 md:col-span-3 md:col-start-10 md:mt-0 mt-12">
                <p
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{ fontFamily: '"Satoshi", sans-serif' }}
                >
                  We believe in the power of restraint. In a world of noise, our
                  focus is the sharpest tool. This is the Monk way—a relentless
                  dedication to craft that clears the space for true creation.
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-32">
              <h1
                className="text-[8vw] leading-[1.1] text-[#3e2723] mb-8"
                style={{ fontFamily: '"Schnyder", serif' }}
              >
                Our{" "}
                <span style={{ color: "#f0660a" }}>discipline</span> is our
                freedom.
              </h1>
              <p
                className="text-[18px] leading-relaxed text-[#3e2723]"
                style={{ fontFamily: '"Satoshi", sans-serif' }}
              >
                We believe in the power of restraint. In a world of noise, our
                focus is the sharpest tool. This is the Monk way—a relentless
                dedication to craft that clears the space for true creation.
              </p>
            </div>
          )}

          <div className="mt-32 mb-32">
            <h2
              className="text-[6vw] leading-[1.1] text-[#3e2723] mb-16"
              style={{ fontFamily: '"Schnyder", serif' }}
            >
              Our Disciplines.
            </h2>
            <div className="space-y-8">
              {disciplines.map((discipline) => {
                const isExpanded = expandedDiscipline === discipline.id;
                return (
                  <div key={discipline.id}>
                    <button
                      onClick={() => handleDisciplineClick(discipline.id)}
                      className="w-full text-left"
                    >
                      <h3
                        className="text-[6vw] leading-[1.1] text-[#3e2723] transition-colors duration-200 hover:text-[#f0660a]"
                        style={{ fontFamily: '"Schnyder", serif' }}
                      >
                        {discipline.title}
                      </h3>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        maxHeight: isExpanded ? "500px" : "0",
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      <p
                        className="text-[18px] leading-relaxed text-[#3e2723] mt-4"
                        style={{ fontFamily: '"Satoshi", sans-serif' }}
                      >
                        {discipline.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-32 mb-32">
            <h2
              className="text-[6vw] leading-[1.1] text-[#3e2723] mb-12"
              style={{ fontFamily: '"Schnyder", serif' }}
            >
              Our Method.
            </h2>
            {isDesktop ? (
              <div
                className="text-[4vw] leading-[1.2] text-[#3e2723] mb-8"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                Inquire{" "}
                <span style={{ color: "#f0660a" }}>→</span> Define{" "}
                <span style={{ color: "#f0660a" }}>→</span> Build{" "}
                <span style={{ color: "#f0660a" }}>→</span> Refine
              </div>
            ) : (
              <div
                className="space-y-2 mb-8"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                <div className="text-[4vw] leading-[1.2] text-[#3e2723]">
                  Inquire{" "}
                  <span style={{ color: "#f0660a" }}>→</span>
                </div>
                <div className="text-[4vw] leading-[1.2] text-[#3e2723]">
                  Define{" "}
                  <span style={{ color: "#f0660a" }}>→</span>
                </div>
                <div className="text-[4vw] leading-[1.2] text-[#3e2723]">
                  Build{" "}
                  <span style={{ color: "#f0660a" }}>→</span>
                </div>
                <div className="text-[4vw] leading-[1.2] text-[#3e2723]">
                  Refine
                </div>
              </div>
            )}
            <p
              className="text-[18px] leading-relaxed text-[#3e2723] max-w-3xl"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              Our process is a loop, not a line. It is a continuous, focused
              ritual dedicated to removing the non-essential until only the
              intentional remains.
            </p>
          </div>

          <figure className="mt-32 mb-32">
            <div className="w-full mb-8 overflow-hidden">
              <picture>
                <source srcSet="/assets/images/studio.webp" type="image/webp" />
                <img
                  src="/assets/images/studio.jpg"
                  alt="Art-directed black and white photograph of the Monk studio space—an empty desk with a notebook, a ray of light on a concrete wall, and a shelf of books. Evokes focus, quiet, and discipline."
                  className="w-full h-auto object-cover"
                  width={1920}
                  height={1080}
                  loading="lazy"
                />
              </picture>
            </div>
            <figcaption
              className="text-center text-[14px] lowercase text-[#3e2723]"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              [ the haus. our scriptorium. ]
            </figcaption>
          </figure>
        </div>
      </section>
      <Footer />
    </>
  );
}
