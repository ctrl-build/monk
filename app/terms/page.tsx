"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Terms() {
  const [spineVisible, setSpineVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);

  useEffect(() => {
    const spineTimer = setTimeout(() => {
      setSpineVisible(true);
    }, 100);

    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 300);

    const lineTimer = setTimeout(() => {
      setLineVisible(true);
    }, 500);

    const bodyTimer = setTimeout(() => {
      setBodyVisible(true);
    }, 700);

    return () => {
      clearTimeout(spineTimer);
      clearTimeout(titleTimer);
      clearTimeout(lineTimer);
      clearTimeout(bodyTimer);
    };
  }, []);

  return (
    <>
      <Header />
      <section className="relative min-h-screen bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 pt-[60px] lg:pt-[80px] pb-20">
        <div
          className="fixed left-4 lg:left-8 xl:left-16 top-1/2 -translate-y-1/2 z-10"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            opacity: spineVisible ? 1 : 0,
            transition: "opacity 400ms ease-out",
          }}
        >
          <div
            className="text-[18px] lowercase text-[#3e2723]"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            terms
          </div>
        </div>

        <div className="max-w-[800px] mx-auto">
          <h1
            className="text-[6vw] md:text-[5vw] lg:text-[4vw] leading-[1.1] text-[#3e2723] mb-8"
            style={{
              fontFamily: '"Schnyder", serif',
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 400ms ease-out, transform 400ms ease-out",
            }}
          >
            Terms of Service
          </h1>

              <div
                className="h-[1px] bg-[#3e2723] mb-12 w-full origin-left"
                style={{
                  transform: lineVisible ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 500ms ease-out",
                }}
              />

          <div
            className="prose prose-lg max-w-none"
            style={{
              opacity: bodyVisible ? 1 : 0,
              transition: "opacity 600ms ease-out",
            }}
          >
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              These Terms of Service govern your use of the monk website. By accessing or using our website, you agree to be bound by these terms.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              use of website
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              You may use our website for lawful purposes only. You agree not to use the website in any way that violates any applicable laws or regulations, or that infringes upon the rights of others.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              intellectual property
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              All content on this website, including text, graphics, logos, images, and software, is the property of monk or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              disclaimer of warranties
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              The information on this website is provided on an "as is" basis. We make no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of the information contained on this website.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              limitation of liability
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              To the fullest extent permitted by law, monk shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the website.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              changes to terms
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              We reserve the right to modify these Terms of Service at any time. Your continued use of the website after any changes constitutes your acceptance of the new terms.
            </p>

            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mt-12"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              Last Updated: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

