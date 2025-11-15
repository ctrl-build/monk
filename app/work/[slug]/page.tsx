"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

interface ProjectData {
  title: string;
  tags: string[];
  heroVideo?: string;
  heroImage?: string;
  fullBleedImage?: string;
  screenRecording?: string;
  intention: string;
  discipline: string;
  disciplineQuote: string;
  craft: string;
  codeSnippet: string;
  liveUrl: string;
  nextProject: {
    title: string;
    slug: string;
  };
}

const projectData: Record<string, ProjectData> = {
  gaplens: {
    title: "GapLens",
    tags: ["design", "development"],
    heroVideo: "/assets/videos/gaplens-hero.mp4",
    fullBleedImage: "/assets/images/gaplens-full-bleed.webp",
    screenRecording: "/assets/videos/gaplens-screen.mp4",
    intention: "GapLens is a fine art photography studio that captures the space between light and shadow. They needed a digital presence that honored the silence and depth of their work—a platform where each image could breathe and command attention without distraction.",
    discipline: "We approached this as an architectural exercise in restraint. The interface became a gallery wall: clean, minimal, and entirely in service of the photography. Every interaction was designed to slow the viewer down, to create space for contemplation. Navigation was reduced to its essence—Archive, Editorial, Studio, Contact—allowing the work itself to be the narrative.",
    disciplineQuote: "The greatest depth is found not in what we show, but in the silence we allow the eye to hold.",
    craft: "The technical challenge was creating a performant, image-first experience that felt both immediate and timeless. We built a custom image loading system that prioritized visual quality while maintaining speed. The site uses subtle scroll-triggered animations and a carefully orchestrated reveal system that lets each photograph arrive with intention.",
    liveUrl: "https://gaplens.com",
    codeSnippet: `useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute('data-reveal');
          if (elementId) {
            setVisibleElements(prev => new Set([...prev, elementId]));
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  const elements = document.querySelectorAll('[data-reveal]');
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);`,
    nextProject: {
      title: "iPower",
      slug: "ipower",
    },
  },
  ipower: {
    title: "iPower",
    tags: ["design", "development", "strategy"],
    heroVideo: "/assets/videos/ipower-hero.mp4",
    fullBleedImage: "/assets/images/ipower-full-bleed.webp",
    screenRecording: "/assets/videos/ipower-screen.mp4",
    intention: "iPower is Lebanon's leading electrical engineering solutions provider, specializing in solar power and electrical systems. They needed a digital presence that communicated trust, expertise, and reliability—essential qualities for a company that powers homes, businesses, and industries across Lebanon.",
    discipline: "We approached this as a strategic brand transformation. Our process involved deep research into Lebanon's electrical engineering landscape and iPower's diverse client base—from residential homes to industrial facilities. We created a design system that balanced technical credibility with approachability, ensuring the site could speak to both homeowners seeking solar solutions and industrial clients requiring complex electrical systems.",
    disciplineQuote: "Every decision was made with intention and purpose.",
    craft: "The technical challenge was creating a performant, content-rich experience that showcased iPower's extensive project portfolio while maintaining clarity and ease of navigation. We built a flexible component system that could handle diverse content types—from project case studies to solution pages—while ensuring the site remained fast and accessible across Lebanon's varying internet conditions.",
    codeSnippet: `const [sliderPosition, setSliderPosition] = useState(25);
const [isDragging, setIsDragging] = useState(false);
const sliderRef = useRef<HTMLDivElement>(null);

const handleSliderMove = (e: MouseEvent | TouchEvent) => {
  if (!sliderRef.current || !isDragging) return;
  
  const rect = sliderRef.current.getBoundingClientRect();
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const percentage = Math.max(0, Math.min(100, 
    ((clientX - rect.left) / rect.width) * 100
  ));
  setSliderPosition(percentage);
};

useEffect(() => {
  if (isDragging) {
    document.addEventListener('mousemove', handleSliderMove);
    document.addEventListener('touchmove', handleSliderMove);
    document.addEventListener('mouseup', () => setIsDragging(false));
    document.addEventListener('touchend', () => setIsDragging(false));
  }
  return () => {
    document.removeEventListener('mousemove', handleSliderMove);
    document.removeEventListener('touchmove', handleSliderMove);
  };
}, [isDragging]);`,
    liveUrl: "https://ipower-9xk.pages.dev",
    nextProject: {
      title: "GapLens",
      slug: "gaplens",
    },
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'gaplens' },
    { slug: 'ipower' },
  ];
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showThread, setShowThread] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const project = projectData[slug] || projectData.gaplens;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://monk.haus/work/${slug}`,
    },
    "headline": `${project.title} – A Monk Chronicle.`,
    "description": `The chronicle of ${project.title}. A study in ${project.tags.join(" and ")}, built with the Monk discipline.`,
    "image": project.heroVideo 
      ? `https://monk.haus${project.heroVideo.replace('.mp4', '-hero.jpg')}`
      : `https://monk.haus${project.fullBleedImage || '/assets/images/logo.png'}`,
    "author": {
      "@type": "Organization",
      "name": "Monk",
      "url": "https://monk.haus",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Monk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://monk.haus/assets/images/logo.png",
      },
    },
  };

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (heroRef.current && isDesktop) {
        const heroBottom = heroRef.current.offsetHeight;
        if (window.scrollY > heroBottom * 0.8) {
          setShowThread(true);
        } else {
          setShowThread(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}
      <section className="relative min-h-screen bg-[#fdfcfb]">
        {isDesktop && showThread && (
          <div
            className="fixed left-4 lg:left-8 xl:left-16 top-0 bottom-0 z-40"
            style={{
              width: "1px",
              backgroundColor: "#f0660a",
              transition: "opacity 400ms ease-out",
            }}
          />
        )}

        {isDesktop ? (
          <>
            <div
              ref={heroRef}
              className="fixed inset-0 w-full h-screen z-10"
              style={{
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            >
              <div className="relative w-full h-full aspect-video">
                {project.heroVideo ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    width={1920}
                    height={1080}
                  >
                    <source src={project.heroVideo} type="video/mp4" />
                  </video>
                ) : project.heroImage ? (
                  <img
                    src={project.heroImage}
                    alt={`Hero image for ${project.title} project`}
                    className="absolute inset-0 w-full h-full object-cover"
                    fetchPriority="high"
                    width={1920}
                    height={1080}
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-900" />
                )}
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 text-center px-4 lg:px-8 xl:px-16 h-full flex items-center justify-center">
                  <div>
                    <h1
                      className="text-[10vw] leading-[1.1] text-[#fdfcfb] mb-4"
                      style={{ fontFamily: '"Schnyder", serif' }}
                    >
                      {project.title}
                    </h1>
                    <div className="flex gap-4 justify-center">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-[16px] lowercase text-[#fdfcfb]"
                          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                        >
                          [ {tag} ]
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative bg-[#fdfcfb]">
            <div className="w-full aspect-[16/9] bg-gray-900 flex items-center justify-center mb-8 overflow-hidden relative">
              {project.heroVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  width={1920}
                  height={1080}
                >
                  <source src={project.heroVideo} type="video/mp4" />
                </video>
              ) : project.heroImage ? (
                <img
                  src={project.heroImage}
                  alt={`Hero image for ${project.title} project`}
                  className="absolute inset-0 w-full h-full object-cover"
                  fetchPriority="high"
                  width={1920}
                  height={1080}
                />
              ) : (
                <div className="relative w-full h-full bg-black/40 flex items-center justify-center">
                  <span className="text-gray-400">Hero Image/Video</span>
                </div>
              )}
            </div>
            <div className="container mx-auto max-w-[1400px] px-4 lg:px-8 xl:px-16 mb-20">
              <h1
                className="text-[12vw] leading-[1.1] text-[#3e2723] mb-4"
                style={{ fontFamily: '"Schnyder", serif' }}
              >
                {project.title}
              </h1>
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
          </div>
        )}

        <div
          className="relative z-20 bg-[#fdfcfb]"
          style={isDesktop ? { marginTop: "100vh" } : { marginTop: 0 }}
        >
          <div className="container mx-auto max-w-[1400px] px-4 lg:px-8 xl:px-16 py-32">
            {isDesktop ? (
              <div className="grid-12 mb-32">
                <div className="col-span-12 md:col-span-6">
                  <h2
                    className="text-[6vw] leading-[1.1] text-[#3e2723] mb-8"
                    style={{ fontFamily: '"Schnyder", serif' }}
                  >
                    The Intention.
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <p
                    className="text-[18px] leading-relaxed text-[#3e2723]"
                    style={{ fontFamily: '"Satoshi", sans-serif' }}
                  >
                    {project.intention}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-20">
                <h2
                  className="text-[8vw] leading-[1.1] text-[#3e2723] mb-8"
                  style={{ fontFamily: '"Schnyder", serif' }}
                >
                  The Intention.
                </h2>
                <p
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{ fontFamily: '"Satoshi", sans-serif' }}
                >
                  {project.intention}
                </p>
              </div>
            )}

            <div className="w-full mb-20 overflow-hidden">
              <div className="relative w-screen aspect-[16/9] overflow-hidden bg-gray-200" style={{ marginLeft: 'calc(50% - 50vw)', width: '100vw' }}>
                {project.fullBleedImage ? (
                  <picture>
                    <source srcSet={project.fullBleedImage} type="image/webp" />
                    <img
                      src={project.fullBleedImage.replace('.webp', '.jpg')}
                      alt={`Full-bleed evidence image from the ${project.title} project, showcasing the visual narrative and design execution.`}
                      className="w-full h-full object-cover"
                      width={1920}
                      height={1080}
                      loading="lazy"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">Full-Bleed Evidence Image</span>
                  </div>
                )}
              </div>
            </div>

            {isDesktop ? (
              <div className="grid-12 mb-32">
                <div className="col-span-12 md:col-span-6">
                  <h2
                    className="text-[6vw] leading-[1.1] text-[#3e2723] mb-8"
                    style={{ fontFamily: '"Schnyder", serif' }}
                  >
                    The Discipline.
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <p
                    className="text-[18px] leading-relaxed text-[#3e2723] mb-8"
                    style={{ fontFamily: '"Satoshi", sans-serif' }}
                  >
                    {project.discipline}
                  </p>
                  <blockquote
                    className="text-[4vw] leading-[1.2] text-[#3e2723] mb-8 italic"
                    style={{ fontFamily: '"Schnyder", serif' }}
                  >
                    &ldquo;{project.disciplineQuote.split(" ").map((word, i, arr) => {
                      const cleanWord = word.replace(/[.,;:!?]/g, "");
                      const isIlluminated = cleanWord.toLowerCase() === "essential";
                      return (
                        <span key={i}>
                          {isIlluminated ? (
                            <span style={{ color: "#f0660a" }}>{word}</span>
                          ) : (
                            word
                          )}
                          {i < arr.length - 1 ? " " : ""}
                        </span>
                      );
                    })}&rdquo;
                  </blockquote>
                </div>
              </div>
            ) : (
              <div className="mb-20">
                <h2
                  className="text-[8vw] leading-[1.1] text-[#3e2723] mb-8"
                  style={{ fontFamily: '"Schnyder", serif' }}
                >
                  The Discipline.
                </h2>
                <p
                  className="text-[18px] leading-relaxed text-[#3e2723] mb-8"
                  style={{ fontFamily: '"Satoshi", sans-serif' }}
                >
                  {project.discipline}
                </p>
                <blockquote
                  className="text-[6vw] leading-[1.2] text-[#3e2723] mb-8 italic w-full"
                  style={{ fontFamily: '"Schnyder", serif' }}
                >
                  &ldquo;{project.disciplineQuote.split(" ").map((word, i, arr) => {
                    const cleanWord = word.replace(/[.,;:!?]/g, "");
                    const isIlluminated = cleanWord.toLowerCase() === "essential";
                    return (
                      <span key={i}>
                        {isIlluminated ? (
                          <span style={{ color: "#f0660a" }}>{word}</span>
                        ) : (
                          word
                        )}
                        {i < arr.length - 1 ? " " : ""}
                      </span>
                    );
                  })}&rdquo;
                </blockquote>
              </div>
            )}

            {isDesktop ? (
              <div className="grid-12 mb-32">
                <div className="col-span-12 md:col-span-6">
                  <h2
                    className="text-[6vw] leading-[1.1] text-[#3e2723] mb-8"
                    style={{ fontFamily: '"Schnyder", serif' }}
                  >
                    The Craft.
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <p
                    className="text-[18px] leading-relaxed text-[#3e2723] mb-8"
                    style={{ fontFamily: '"Satoshi", sans-serif' }}
                  >
                    {project.craft}
                  </p>
                  <pre
                    className="bg-[#3e2723] text-[#fdfcfb] p-6 rounded overflow-x-auto mb-8"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    <code>{project.codeSnippet}</code>
                  </pre>
                  {project.screenRecording ? (
                    <div className="w-full aspect-video bg-gray-900 rounded overflow-hidden">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                      >
                        <source src={project.screenRecording} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Screen Recording</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mb-20">
                <h2
                  className="text-[8vw] leading-[1.1] text-[#3e2723] mb-8"
                  style={{ fontFamily: '"Schnyder", serif' }}
                >
                  The Craft.
                </h2>
                <p
                  className="text-[18px] leading-relaxed text-[#3e2723] mb-8"
                  style={{ fontFamily: '"Satoshi", sans-serif' }}
                >
                  {project.craft}
                </p>
                <pre
                  className="bg-[#3e2723] text-[#fdfcfb] p-6 rounded overflow-x-auto mb-8 w-full"
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  <code>{project.codeSnippet}</code>
                </pre>
                {project.screenRecording ? (
                  <div className="w-full aspect-video bg-gray-900 rounded overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      width={1920}
                      height={1080}
                    >
                      <source src={project.screenRecording} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Screen Recording</span>
                  </div>
                )}
              </div>
            )}

            {isDesktop ? (
              <div className="w-full py-32 mb-32 text-center">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-colors duration-200"
                  style={{
                    fontFamily: '"Schnyder", serif',
                    fontSize: "6vw",
                    color: "#3e2723",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f0660a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3e2723";
                  }}
                >
                  [ view the live experience ]
                </a>
              </div>
            ) : (
              <div className="w-full py-20 mb-20">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-200"
                  style={{
                    fontFamily: '"Schnyder", serif',
                    fontSize: "8vw",
                    color: "#3e2723",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f0660a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3e2723";
                  }}
                >
                  [ view the live experience ]
                </a>
              </div>
            )}

            <div className={`${isDesktop ? "pt-32" : "pt-20"} border-t border-[#3e2723]`}>
              <div className="mb-4">
                <p
                  className="text-[14px] uppercase tracking-wider text-[#3e2723] mb-4"
                  style={{ fontFamily: '"Satoshi", sans-serif' }}
                >
                  Next Chronicle
                </p>
              </div>
              <Link
                href={`/work/${project.nextProject.slug}`}
                className="block group"
              >
                <h3
                  className={`${isDesktop ? "text-[6vw]" : "text-[8vw]"} leading-[1.1] text-[#3e2723] transition-all duration-200`}
                  style={{
                    fontFamily: '"Schnyder", serif',
                    borderBottom: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = "#3e2723";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = "transparent";
                  }}
                >
                  [ {project.nextProject.title} ]
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

