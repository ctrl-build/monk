"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

interface Project {
  id: string;
  title: string;
  tags: string[];
  href: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "GapLens",
    tags: ["design", "development"],
    href: "/work/gaplens",
    image: "/assets/images/gaplens-full-bleed.webp",
  },
  {
    id: "2",
    title: "iPower",
    tags: ["design", "development", "strategy"],
    href: "/work/ipower",
    image: "/assets/images/ipower-full-bleed.webp",
  },
];

export default function Work() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [spineLetters, setSpineLetters] = useState<string[]>([]);
  const [revealedRows, setRevealedRows] = useState<Set<string>>(new Set());
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imageRevealed, setImageRevealed] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const word = "work";
      let letterIndex = 0;
      let projectIndex = 0;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;

        if (letterIndex < word.length && elapsed >= letterIndex * 100 + 200) {
          setSpineLetters((prev) => [...prev, word[letterIndex]]);
          letterIndex++;
        }

        if (projectIndex < projects.length && elapsed >= projectIndex * 200 + 600) {
          setRevealedRows((prev) => new Set(prev).add(projects[projectIndex].id));
          projectIndex++;
        }

        if (letterIndex < word.length || projectIndex < projects.length) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    if (hoveredProject && isDesktop) {
      document.addEventListener("mousemove", handleMouseMove);
      setTimeout(() => {
        setImageRevealed(hoveredProject);
      }, 100);
    } else {
      setImageRevealed(null);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredProject, isDesktop]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
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
            <div className="space-y-16">
              {projects.map((project) => {
                const isRevealed = revealedRows.has(project.id);
                const isHovered = hoveredProject === project.id;

                return (
                  <Link
                    key={project.id}
                    href={project.href}
                    className="block"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative">
                      <div
                        className="h-[1px] bg-[#3e2723] transition-all duration-500 ease-out"
                        style={{
                          width: isRevealed ? "100%" : "0%",
                        }}
                      />
                      <div
                        className="flex justify-between items-baseline pt-8 pb-4"
                        style={{
                          opacity: isRevealed ? 1 : 0,
                          transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                          transition: "opacity 400ms ease-out, transform 400ms ease-out",
                        }}
                      >
                        <h2
                          className="text-[6vw] leading-[1.1] transition-colors duration-200"
                          style={{
                            fontFamily: '"Schnyder", serif',
                            color: isHovered ? "#f0660a" : "#3e2723",
                          }}
                        >
                          {project.title}
                        </h2>
                        <div className="flex gap-4">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-[16px] lowercase text-[#3e2723]"
                              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                            >
                              [ {tag} ]
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-20">
              {projects.map((project) => {
                const isRevealed = revealedRows.has(project.id);
                return (
                  <Link key={project.id} href={project.href} className="block">
                    <div className="w-full aspect-[4/3] mb-4 overflow-hidden bg-gray-200 relative">
                      <picture>
                        <source srcSet={project.image} type="image/webp" />
                        <img
                          src={project.image.replace('.webp', '.jpg')}
                          alt={`Art-directed photograph showcasing the ${project.title} project, a study in ${project.tags.join(" and ")}.`}
                          className="w-full h-full object-cover"
                          width={1200}
                          height={900}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                        />
                      </picture>
                    </div>
                    <h2
                      className="text-[8vw] leading-[1.1] text-[#3e2723] mb-2"
                      style={{
                        fontFamily: '"Schnyder", serif',
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 400ms ease-out, transform 400ms ease-out",
                      }}
                    >
                      {project.title}
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-[14px] lowercase text-[#3e2723]"
                          style={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            opacity: isRevealed ? 1 : 0,
                            transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                            transition: `opacity 400ms ease-out ${index * 50}ms, transform 400ms ease-out ${index * 50}ms`,
                          }}
                        >
                          [ {tag} ]
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {isDesktop && hoveredProject && (
            <div
              ref={imageRef}
              className="fixed pointer-events-none z-50 w-[320px] h-[400px]"
              style={{
                left: `${cursorPosition.x}px`,
                top: `${cursorPosition.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {projects.map((project) => {
                const isActive = imageRevealed === project.id;
                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 300ms ease-out",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-[#fdfcfb] z-10 transition-transform duration-300 ease-out"
                      style={{
                        transform: isActive ? "translateX(-100%)" : "translateX(0)",
                      }}
                    />
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <picture>
                        <source srcSet={project.image} type="image/webp" />
                        <img
                          src={project.image.replace('.webp', '.jpg')}
                          alt={`Art-directed photograph showcasing the ${project.title} project, a study in ${project.tags.join(" and ")}.`}
                          className="w-full h-full object-cover"
                          width={320}
                          height={400}
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
