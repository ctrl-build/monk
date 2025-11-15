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
    if (isMobile) {
      setRevealedProjects(new Set(projects.map(p => p.id)));
      return;
    }

    // Staggered reveal: 150ms between each project
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute("data-project-id");
            if (projectId) {
              const projectIndex = projects.findIndex((p) => p.id === projectId);
              const delay = projectIndex * 150;
              setTimeout(() => {
                setRevealedProjects((prev) => {
                  if (prev.has(projectId)) return prev;
                  return new Set(prev).add(projectId);
                });
              }, delay);
            }
          }
        });
      },
      { threshold: 0.01, rootMargin: "200px 0px" }
    );

    const projectElements = sectionRef.current?.querySelectorAll("[data-project-id]");
    projectElements?.forEach((el) => observer.observe(el));

    return () => {
      projectElements?.forEach((el) => observer.unobserve(el));
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) {
      document.body.style.cursor = "auto";
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }
      return;
    }

    const cursorEl = cursorRef.current;
    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = () => {
      cursorEl.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
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
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
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
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={project.href} className="block w-full h-full">
                  <div className={`relative w-full aspect-[4/3] overflow-hidden ${
                    isDesktop ? "lg:h-[600px]" : ""
                  } ${isTablet && isHovered ? "border border-[#3e2723]" : ""}`}
                  style={{
                    borderWidth: isTablet && isHovered ? "1px" : "0",
                  }}>
                    {!isMobile && (
                      <div
                        className="absolute inset-0 bg-[#fdfcfb] z-10 will-change-transform"
                        style={{
                          transform: isRevealed ? "translate3d(-100%, 0, 0)" : "translate3d(0, 0, 0)",
                          transition: isRevealed ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                        }}
                      />
                    )}
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
                        <img
                          src={project.image}
                          alt={`Art-directed photograph showcasing the ${project.title} project, a study in ${project.tags.join(" and ")}.`}
                          className="w-full h-full object-cover"
                          width={1200}
                          height={900}
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                        />
                      )}
                      {isDesktop && (
                        <div
                          className="absolute inset-0 pointer-events-none will-change-opacity"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            opacity: isHovered ? 1 : 0,
                            transition: "opacity 100ms ease-out",
                          }}
                        />
                      )}
                    </div>

                    {isDesktop && (
                      <div 
                        className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 pointer-events-none will-change-[opacity,transform]"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
                          transition: "opacity 100ms ease-out, transform 100ms ease-out",
                          pointerEvents: "none",
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
                        <div className="flex gap-4">
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
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          display: "none",
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
