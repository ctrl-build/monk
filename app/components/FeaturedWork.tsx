"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  tags: string[];
  href: string;
  image: string;
  video?: string;
  colSpan: number;
  colStart: number;
  rowSpan?: number;
}

const projects: Project[] = [
  {
    id: "1",
    title: "GapLens",
    tags: ["design", "development"],
    href: "/work/gaplens",
    image: "/assets/images/gaplens-full-bleed.webp",
    colSpan: 6,
    colStart: 1,
  },
  {
    id: "2",
    title: "iPower",
    tags: ["design", "development", "strategy"],
    href: "/work/ipower",
    image: "/assets/images/ipower-full-bleed.webp",
    colSpan: 8,
    colStart: 7,
  },
];

export default function FeaturedWork() {
  const [revealedProjects, setRevealedProjects] = useState<Set<string>>(new Set());
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsTablet(width >= 768 && width < 1024);
      setIsMobile(width < 768);
    };
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute("data-project-id");
            if (projectId) {
              const delay = projects.findIndex((p) => p.id === projectId) * 100;
              setTimeout(() => {
                setRevealedProjects((prev) => new Set(prev).add(projectId));
              }, delay);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    const projectElements = sectionRef.current?.querySelectorAll("[data-project-id]");
    projectElements?.forEach((el) => observer.observe(el));

    return () => {
      projectElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) {
      document.body.style.cursor = "auto";
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }
      return;
    }

    const cursorEl = cursorRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      cursorEl.style.left = `${e.clientX}px`;
      cursorEl.style.top = `${e.clientY}px`;
    };

    if (hoveredProject) {
      cursorEl.style.display = "block";
      document.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.body.style.cursor = "none";
    } else {
      cursorEl.style.display = "none";
      document.body.style.cursor = "auto";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
      if (cursorEl) {
        cursorEl.style.display = "none";
      }
    };
  }, [hoveredProject, isDesktop]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 py-32"
      >
        <div className={`container mx-auto max-w-[1400px] ${isDesktop ? "grid-12 gap-8" : "flex flex-col"} ${isMobile ? "gap-20" : "gap-8"}`}>
          {projects.map((project, index) => {
            const isRevealed = revealedProjects.has(project.id);
            const isHovered = hoveredProject === project.id;
            const isTabletLeft = isTablet && index % 2 === 0;
            const isTabletRight = isTablet && index % 2 === 1;
            const showTextByDefault = isTablet || isMobile;

            return (
              <div
                key={project.id}
                data-project-id={project.id}
                className={`relative overflow-hidden ${
                  isDesktop ? "col-span-12" : ""
                } ${isTablet ? (isTabletLeft ? "self-start" : "self-end") : ""} ${
                  isTablet ? "w-[80%]" : isMobile ? "w-full" : ""
                }`}
                style={{
                  gridColumn: isDesktop
                    ? `${project.colStart} / span ${project.colSpan}`
                    : undefined,
                }}
                onMouseEnter={() => {
                  if (hoveredProject !== project.id) {
                    setHoveredProject(project.id);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                }}
              >
                <Link href={project.href} className="block w-full h-full">
                  <div className={`relative w-full aspect-[4/3] overflow-hidden ${
                    isDesktop ? "lg:h-[600px]" : ""
                  } ${isTablet && isHovered ? "border border-[#3e2723]" : ""}`}
                  style={{
                    borderWidth: isTablet && isHovered ? "1px" : "0",
                  }}>
                    <div
                      className="absolute inset-0 bg-[#fdfcfb] z-10 transition-transform duration-500 ease-out"
                      style={{
                        transform: isRevealed ? "translateX(-100%)" : "translateX(0)",
                      }}
                    />
                    <div className="absolute inset-0">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          width={1200}
                          height={900}
                        />
                      ) : (
                        <picture>
                          <source srcSet={project.image} type="image/webp" />
                          <img
                            src={project.image.replace('.webp', '.jpg')}
                            alt={`Art-directed photograph showcasing the ${project.title} project, a study in ${project.tags.join(" and ")}.`}
                            className="w-full h-full object-cover"
                            width={1200}
                            height={900}
                            loading={index === 0 ? "eager" : "lazy"}
                            fetchPriority={index === 0 ? "high" : undefined}
                          />
                        </picture>
                      )}
                      {isDesktop && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.15)",
                            opacity: isHovered ? 1 : 0,
                            transition: isHovered ? "opacity 150ms ease-out" : "opacity 100ms ease-out",
                          }}
                        />
                      )}
                    </div>

                    {isDesktop && (
                      <div 
                        className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 pointer-events-none"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateY(0)" : "translateY(20px)",
                          transition: "opacity 200ms ease-out, transform 200ms ease-out",
                          willChange: isHovered ? "opacity, transform" : "auto",
                        }}
                      >
                        <h3
                          className="text-[4vw] lg:text-[4vw] text-[#3e2723] mb-4"
                          style={{
                            fontFamily: '"Schnyder", serif',
                          }}
                        >
                          {project.title}
                        </h3>
                        <div
                          className="flex gap-4"
                          style={{
                            transition: "opacity 200ms ease-out 100ms, transform 200ms ease-out 100ms",
                          }}
                        >
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-[14px] lowercase text-[#3e2723]"
                              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                            >
                              [ {tag} ]
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {showTextByDefault && (
                    <div className={`mt-4 ${isTabletLeft || isMobile ? "text-left" : "text-right"}`}>
                      <h3
                        className="text-[4vw] md:text-[3vw] text-[#3e2723] mb-2"
                        style={{
                          fontFamily: '"Schnyder", serif',
                        }}
                      >
                        {project.title}
                      </h3>
                      <div className="flex gap-4 flex-wrap">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-[14px] lowercase text-[#3e2723]"
                            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                          >
                            [ {tag} ]
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] will-change-[left,top]"
        style={{
          display: "none",
          transform: "translate(-50%, -50%)",
          left: "0px",
          top: "0px",
        }}
      >
        <span
          className="text-[16px] lowercase whitespace-nowrap"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          <span style={{ color: "#f0660a" }}>[</span>
          <span style={{ color: "#3e2723" }}> view project </span>
          <span style={{ color: "#f0660a" }}>]</span>
        </span>
      </div>
    </>
  );
}
