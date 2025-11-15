"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    const headlineTimer = setTimeout(() => {
      setHeadlineVisible(true);
    }, 100);

    const bodyTimer = setTimeout(() => {
      setBodyVisible(true);
    }, 400);

    const linksTimer = setTimeout(() => {
      setLinksVisible(true);
    }, 600);

    return () => {
      clearTimeout(headlineTimer);
      clearTimeout(bodyTimer);
      clearTimeout(linksTimer);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#fdfcfb] flex items-center justify-center px-4 lg:px-8 xl:px-16 pt-[60px] lg:pt-[80px] pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-[7vw] leading-[1.1] text-[#3e2723] mb-8"
            style={{
              fontFamily: '"Schnyder", serif',
              opacity: headlineVisible ? 1 : 0,
              transform: headlineVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 400ms ease-out, transform 400ms ease-out",
            }}
          >
            This page is{" "}
            <span style={{ color: "#f0660a" }}>without</span> intention.
          </h1>

          <p
            className="text-[18px] leading-relaxed text-[#3e2723] mb-12"
            style={{
              fontFamily: '"Satoshi", sans-serif',
              opacity: bodyVisible ? 1 : 0,
              transform: bodyVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 400ms ease-out, transform 400ms ease-out",
            }}
          >
            The requested path is undefined. We guide you back to the work.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            style={{
              opacity: linksVisible ? 1 : 0,
              transition: "opacity 400ms ease-out",
            }}
          >
            <Link
              href="/"
              className="text-[16px] lowercase text-[#3e2723] relative"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = "#f0660a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = "transparent";
              }}
            >
              <span
                style={{
                  borderBottom: "1px solid transparent",
                  transition: "border-color 200ms ease-out",
                }}
              >
                [ return home ]
              </span>
            </Link>
            <Link
              href="/work"
              className="text-[16px] lowercase text-[#3e2723] relative"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomColor = "#f0660a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomColor = "transparent";
              }}
            >
              <span
                style={{
                  borderBottom: "1px solid transparent",
                  transition: "border-color 200ms ease-out",
                }}
              >
                [ view our work ]
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

