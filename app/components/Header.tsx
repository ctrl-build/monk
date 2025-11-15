"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/work", label: "work" },
    { href: "/studio", label: "studio" },
    { href: "/contact", label: "contact" },
  ];

  const [overlayLinksRevealed, setOverlayLinksRevealed] = useState(0);

  useEffect(() => {
    if (isMenuOpen) {
      setOverlayLinksRevealed(0);
      const timeouts: NodeJS.Timeout[] = [];
      requestAnimationFrame(() => {
        const revealTimer = setTimeout(() => {
          navLinks.forEach((_, index) => {
            const timeout = setTimeout(() => {
              setOverlayLinksRevealed(index + 1);
            }, index * 100 + 200);
            timeouts.push(timeout);
          });
        }, 300);
        timeouts.push(revealTimer);
      });
      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    } else {
      setOverlayLinksRevealed(0);
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] lg:h-[80px] bg-[#fdfcfb]">
        <div className="relative h-full w-full">
          <div className="absolute left-4 lg:left-8 xl:left-16 top-0 flex h-full items-center">
            <Link
              href="/"
              aria-label="Navigate to Monk homepage"
              className="relative h-[24px] lg:h-[32px] w-auto transition-opacity hover:opacity-80"
            >
              <Image
                src="/assets/images/logo.png"
                alt="Monk logo - A Studio for Intentional Web Design & Development"
                width={80}
                height={32}
                className="h-full w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <nav className="hidden lg:block">
            <div className="absolute right-4 lg:right-8 xl:right-16 top-0 flex h-full items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-label={`View our ${link.label}`}
                    className={`group relative text-[18px] lowercase leading-none text-[#3e2723] ${
                      isActive ? "line-through" : ""
                    }`}
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                    }}
                  >
                    {link.label}
                    {!isActive && (
                      <span
                        className="absolute left-0 h-[1px] w-full origin-left scale-x-0 bg-[#f0660a] transition-transform duration-150 ease-out group-hover:scale-x-100"
                        style={{
                          bottom: "-4px",
                          transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute right-4 top-0 flex h-full items-center lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative text-[18px] lowercase leading-none text-[#3e2723]">
              <span
                className={`absolute inset-0 transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                menu
              </span>
              <span
                className={`transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                close
              </span>
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#fdfcfb] lg:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-12">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            const isRevealed = index < overlayLinksRevealed;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                aria-label={`Navigate to ${link.label}`}
                className={`lowercase text-[#3e2723] transition-opacity hover:opacity-70 ${
                  isActive ? "line-through" : ""
                }`}
                style={{
                  fontFamily: '"Schnyder", serif',
                  fontSize: "clamp(48px, 10vw, 72px)",
                  lineHeight: "1.4",
                  textDecorationThickness: "1px",
                  textDecorationColor: "#3e2723",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 200ms ease-out, transform 200ms ease-out",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

