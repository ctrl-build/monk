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
}

const projects: Project[] = [
  {
    id: "1",
    title: "GapLens",
    tags: ["design", "development"],
    href: "/work/gaplens",
    image: "/assets/images/gaplens-full-bleed.webp",
    video: "/assets/videos/gaplens-hero.mp4",
  },
  {
    id: "2",
    title: "iPower",
    tags: ["design", "development", "strategy"],
    href: "/work/ipower",
    image: "/assets/images/ipower-full-bleed.webp",
    video: "/assets/videos/ipower-hero.mp4",
  },
];

export default function FeaturedWork() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredVisual, setHoveredVisual] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      // Reset active project on mobile
      if (width < 1024 && activeProject) {
        setActiveProject(null);
      }
    };
    checkBreakpoint();
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkBreakpoint, 150);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [activeProject]);

  // Disable scrolling when visual is revealed
  useEffect(() => {
    if (activeProject && isDesktop) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      // Also prevent scroll events
      const preventScroll = (e: WheelEvent | TouchEvent) => {
        e.preventDefault();
      };
      
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [activeProject, isDesktop]);

  // Custom cursor for desktop hover
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

    if ((hoveredProject && !activeProject) || hoveredVisual) {
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
  }, [hoveredProject, activeProject, hoveredVisual, isDesktop]);

  const handleProjectClick = (projectId: string, e: React.MouseEvent) => {
    if (!isDesktop) return;
    e.preventDefault();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveProject(projectId);
    
    // Allow animation to complete
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveProject(null);
    setHoveredVisual(false);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const activeProjectData = activeProject 
    ? projects.find(p => p.id === activeProject) 
    : null;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 py-32"
      >
        {isDesktop ? (
          // Desktop: The Illuminated Index
          <div className="container mx-auto max-w-[1400px]">
            <div className="relative min-h-[60vh]">
              {/* Project Titles Stack */}
              <div className="flex flex-col gap-16 lg:gap-24">
                {projects.map((project) => {
                  const isActive = activeProject === project.id;
                  const isHovered = hoveredProject === project.id && !activeProject;
                  const shouldHide = activeProject && !isActive;

                  return (
                    <div
                      key={project.id}
                      className="relative"
                      style={{
                        opacity: shouldHide ? 0 : 1,
                        transform: shouldHide ? "translateY(-40px)" : "translateY(0)",
                        transition: "opacity 400ms ease-out, transform 400ms ease-out",
                        pointerEvents: activeProject && !isActive ? "none" : "auto",
                      }}
                    >
                      <button
                        onClick={(e) => handleProjectClick(project.id, e)}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className="text-left w-full"
                        style={{
                          color: isActive ? "#f0660a" : "#3e2723",
                          fontSize: "7vw",
                          fontFamily: '"Schnyder", serif',
                          lineHeight: "1.1",
                          textDecorationLine: isHovered ? "underline" : "none",
                          textDecorationColor: "#3e2723",
                          textDecorationThickness: "1px",
                          textUnderlineOffset: "0.1em",
                          transition: "color 300ms ease-out, text-decoration-line 200ms ease-out",
                          cursor: "pointer",
                        }}
                      >
                        {project.title}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Revealed Visual */}
              {activeProjectData && (
                <div
                  ref={visualRef}
                  className="fixed inset-0 z-40 pointer-events-none"
                  style={{
                    top: "80px",
                    opacity: activeProject ? 1 : 0,
                    transition: "opacity 200ms ease-out",
                    pointerEvents: activeProject ? "auto" : "none",
                  }}
                >
                  {/* Vellum Mask */}
                  <div
                    className="absolute inset-0 bg-[#fdfcfb] z-10 will-change-transform"
                    style={{
                      transform: activeProject ? "translate3d(-100%, 0, 0)" : "translate3d(0, 0, 0)",
                      transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />

                  {/* Visual Content */}
                  <div className="absolute inset-0 z-0">
                    {activeProjectData.video ? (
                      <video
                        src={activeProjectData.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                        preload="auto"
                      />
                    ) : (
                      <img
                        src={activeProjectData.image}
                        alt={`Art-directed photograph showcasing the ${activeProjectData.title} project, a study in ${activeProjectData.tags.join(" and ")}.`}
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                      />
                    )}
                  </div>

                  {/* Clickable Link Overlay */}
                  <Link
                    href={activeProjectData.href}
                    className="absolute inset-0 z-20 pointer-events-auto"
                    onMouseEnter={() => setHoveredVisual(true)}
                    onMouseLeave={() => setHoveredVisual(false)}
                  />

                  {/* Title Overlay */}
                  <div className="absolute inset-0 z-30 flex flex-col justify-center items-start px-4 lg:px-8 xl:px-16 pointer-events-none">
                    <h2
                      className="mb-6"
                      style={{
                        color: "#f0660a",
                        fontSize: "7vw",
                        fontFamily: '"Schnyder", serif',
                        lineHeight: "1.1",
                      }}
                    >
                      {activeProjectData.title}
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                      {activeProjectData.tags.map((tag, index) => (
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

                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClose(e);
                    }}
                    className="fixed z-[100] pointer-events-auto"
                    style={{
                      top: "96px",
                      right: "32px",
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: "16px",
                      color: "#3e2723",
                      cursor: "pointer",
                    }}
                  >
                    [ x ]
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Mobile/Tablet: The Editorial Stack
          <div className="container mx-auto max-w-[1400px]">
            <div className="flex flex-col gap-20">
              {projects.map((project) => (
                <div key={project.id} className="w-full">
                  {/* Title */}
                  <h2
                    className="mb-4 text-left"
                    style={{
                      color: "#3e2723",
                      fontSize: "clamp(2rem, 8vw, 4rem)",
                      fontFamily: '"Schnyder", serif',
                      lineHeight: "1.1",
                    }}
                  >
                    {project.title}
                  </h2>

                  {/* Tags */}
                  <div className="flex gap-4 flex-wrap mb-6">
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

                  {/* Image/Video */}
                  <div className="w-full mb-6">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                        width={1200}
                        height={900}
                        preload="auto"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={`Art-directed photograph showcasing the ${project.title} project, a study in ${project.tags.join(" and ")}.`}
                        className="w-full h-auto"
                        width={1200}
                        height={900}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>

                  {/* View Project Link */}
                  <Link
                    href={project.href}
                    className="inline-block text-left"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: "14px",
                      textTransform: "lowercase",
                      color: "#3e2723",
                    }}
                  >
                    <span style={{ color: "#f0660a" }}>[</span>
                    <span> view project </span>
                    <span style={{ color: "#f0660a" }}>]</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Custom Cursor for Desktop */}
      {isDesktop && (
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
            {hoveredVisual ? (
              <>
                <span style={{ color: "#f0660a" }}>[</span>
                <span style={{ color: "#3e2723" }}> view project </span>
                <span style={{ color: "#f0660a" }}>]</span>
              </>
            ) : (
              <>
                <span style={{ color: "#f0660a" }}>[</span>
                <span style={{ color: "#3e2723" }}> + </span>
                <span style={{ color: "#f0660a" }}>]</span>
              </>
            )}
          </span>
        </div>
      )}
    </>
  );
}
