"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Privacy() {
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
            privacy
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
            Privacy Policy
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
              At monk, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              information we collect
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              We collect information that you provide directly to us, such as when you fill out our contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, and any other information you choose to provide.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              how we use your information
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              We use the information we collect to respond to your inquiries, provide you with information about our services, improve our website, and communicate with you about our work.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              cookies and tracking
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              We may use cookies and similar tracking technologies to collect and store information about your preferences and how you interact with our website. You can control cookie preferences through your browser settings.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              data security
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              your rights
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us using the information provided on our contact page.
            </p>

            <h2
              className="text-[18px] lowercase text-[#3e2723] mb-4 mt-12"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              changes to this policy
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#3e2723] mb-8"
              style={{ fontFamily: '"Satoshi", sans-serif' }}
            >
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
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

