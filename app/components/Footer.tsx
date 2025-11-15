"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isBaselineVisible, setIsBaselineVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              setIsInvitationVisible(true);
              setTimeout(() => {
                setIsLineVisible(true);
              }, 300);
              setTimeout(() => {
                setIsBaselineVisible(true);
              }, 500);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const socialLinks = [
    { label: "_monk.haus_", href: "https://instagram.com/_monk.haus_" },
  ];

  return (
    <footer ref={footerRef} className="relative bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 pt-32 pb-20">
      <div className="container mx-auto max-w-[1400px]">
        <div className="mb-10">
          <Link
            href="/contact"
            aria-label="Get in touch with Monk"
            className="group block"
          >
            <h2
              className="text-[7vw] lg:text-[5vw] leading-[1.1] transition-colors duration-200"
              style={{
                fontFamily: '"Schnyder", serif',
                color: "#3e2723",
                opacity: isInvitationVisible ? 1 : 0,
                transform: isInvitationVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 400ms ease-out, transform 400ms ease-out, color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f0660a";
                const period = e.currentTarget.querySelector("span");
                if (period) {
                  period.style.color = "#f0660a";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#3e2723";
                const period = e.currentTarget.querySelector("span");
                if (period) {
                  period.style.color = "#f0660a";
                }
              }}
            >
              Let&apos;s create something intentional
              <span style={{ color: "#f0660a" }}>.</span>
            </h2>
          </Link>
        </div>

        <div className="h-[1px] bg-[#3e2723] origin-left transition-all duration-800 ease-out mb-10" style={{
          width: isLineVisible ? "100%" : "0%",
          marginTop: "40px",
        }} />

        <div
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 h-[60px]"
          style={{
            opacity: isBaselineVisible ? 1 : 0,
            transition: "opacity 400ms ease-out",
          }}
        >
          <div className="flex flex-wrap gap-8">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${link.label} profile`}
                className="group relative text-[14px] lowercase text-[#3e2723] transition-colors duration-200"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#f0660a] transition-transform duration-200 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
            <Link
              href="/privacy"
              aria-label="View our privacy policy"
              className="group relative text-[14px] lowercase text-[#3e2723] transition-colors duration-200"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              privacy
              <span
                className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#f0660a] transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </Link>
            <Link
              href="/terms"
              aria-label="View our terms of service"
              className="group relative text-[14px] lowercase text-[#3e2723] transition-colors duration-200"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              terms
              <span
                className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[#f0660a] transition-transform duration-200 ease-out group-hover:scale-x-100"
              />
            </Link>
          </div>
          <div className="text-[14px] lowercase text-[#3e2723]" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            © monk
          </div>
        </div>
      </div>
    </footer>
  );
}

