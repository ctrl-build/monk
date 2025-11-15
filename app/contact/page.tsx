"use client";

import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const intentions = [
  "build a new experience",
  "redefine an existing brand",
  "discuss a partnership",
  "something else entirely",
];

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [formLinesVisible, setFormLinesVisible] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    intention: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setHeadlineVisible(true);
      }, 200);

      [0, 1, 2, 3].forEach((index) => {
        setTimeout(() => {
          setFormLinesVisible((prev) => [...prev, index]);
        }, 400 + index * 200);
      });
    }
  }, [isLoaded]);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
  };

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c31a21dd-1c66-4277-bc28-02088cf06aa1",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          intention: formData.intention,
          message: formData.message,
          subject: `Contact from ${formData.name}${formData.company ? ` at ${formData.company}` : ""}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTimeout(() => {
          setIsSubmitted(true);
          setTimeout(() => {
            setShowSuccess(true);
          }, 300);
        }, 100);
      } else {
        console.error("Form submission failed:", result);
        alert("There was an error submitting your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your message. Please try again.");
    }
  };

  if (isSubmitted && showSuccess) {
    return (
      <section className="relative min-h-screen bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 py-32 flex items-center justify-center">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-5">
              <p
                className="text-[24px] leading-relaxed text-[#3e2723]"
                style={{
                  fontFamily: '"Satoshi", sans-serif',
                  opacity: showSuccess ? 1 : 0,
                  transition: "opacity 400ms ease-out",
                }}
              >
                Thank you. We will be in touch.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}
      <section className="relative min-h-screen bg-[#fdfcfb] px-4 lg:px-8 xl:px-16 py-32">
        <div className="container mx-auto max-w-[1400px]">
          {isDesktop ? (
            <div className="grid-12">
              <div className="col-span-12 md:col-span-5 mb-16 md:mb-0">
                <h1
                  className="text-[8vw] leading-[1.1] text-[#3e2723]"
                  style={{
                    fontFamily: '"Schnyder", serif',
                    opacity: headlineVisible && !isSubmitted ? 1 : 0,
                    transform: headlineVisible && !isSubmitted ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  Let&apos;s create something intentional
                  <span style={{ color: "#f0660a" }}>.</span>
                </h1>
              </div>

              <div className="col-span-12 md:col-span-6 md:col-start-7">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                style={{
                  opacity: isSubmitted ? 0 : 1,
                  transition: "opacity 400ms ease-out",
                }}
              >
                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(0) ? 1 : 0,
                    transform: formLinesVisible.includes(0) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  My name is{" "}
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Name"
                    required
                    className="bg-transparent border-0 border-b outline-none focus:outline-none"
                    style={{
                      borderBottomWidth: focusedField === "name" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                      width: "120px",
                    }}
                  />{" "}
                  and I work with{" "}
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Company (optional)"
                    className="bg-transparent border-0 border-b outline-none focus:outline-none"
                    style={{
                      borderBottomWidth: focusedField === "company" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                      width: "180px",
                    }}
                  />
                  .
                </div>

                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(1) ? 1 : 0,
                    transform: formLinesVisible.includes(1) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  My email is{" "}
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Email"
                    required
                    className="bg-transparent border-0 border-b outline-none focus:outline-none"
                    style={{
                      borderBottomWidth: focusedField === "email" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                      width: "150px",
                    }}
                  />
                  .
                </div>

                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(2) ? 1 : 0,
                    transform: formLinesVisible.includes(2) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  I&apos;m looking to{" "}
                  <select
                    value={formData.intention}
                    onChange={(e) => handleInputChange("intention", e.target.value)}
                    onFocus={() => setFocusedField("intention")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="bg-transparent border-0 border-b outline-none focus:outline-none appearance-none cursor-pointer"
                    style={{
                      borderBottomWidth: focusedField === "intention" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: formData.intention ? "#3e2723" : "#999",
                      width: "220px",
                    }}
                  >
                    <option value="" disabled>
                      select your intention
                    </option>
                    {intentions.map((intention) => (
                      <option key={intention} value={intention}>
                        {intention}
                      </option>
                    ))}
                  </select>
                  ...
                </div>

                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(3) ? 1 : 0,
                    transform: formLinesVisible.includes(3) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us more about your project."
                    required
                    rows={4}
                    className="bg-transparent border-0 border-b outline-none focus:outline-none resize-none w-full"
                    style={{
                      borderBottomWidth: focusedField === "message" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 px-8 py-4 transition-all duration-200 ease-out"
                  style={{
                    backgroundColor: "#f0660a",
                    color: "#fdfcfb",
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: "18px",
                    textTransform: "lowercase",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfcfb";
                    e.currentTarget.style.border = "1px solid #f0660a";
                    e.currentTarget.style.color = "#f0660a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0660a";
                    e.currentTarget.style.border = "none";
                    e.currentTarget.style.color = "#fdfcfb";
                  }}
                >
                  [ send ]
                </button>
              </form>
            </div>
          </div>
          ) : (
            <div>
              <h1
                className="text-[12vw] leading-[1.1] text-[#3e2723] mb-[60px]"
                style={{
                  fontFamily: '"Schnyder", serif',
                  opacity: headlineVisible && !isSubmitted ? 1 : 0,
                  transform: headlineVisible && !isSubmitted ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 400ms ease-out, transform 400ms ease-out",
                }}
              >
                Let&apos;s create something intentional
                <span style={{ color: "#f0660a" }}>.</span>
              </h1>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                style={{
                  opacity: isSubmitted ? 0 : 1,
                  transition: "opacity 400ms ease-out",
                }}
              >
                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(0) ? 1 : 0,
                    transform: formLinesVisible.includes(0) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  My name is{" "}
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Name"
                    required
                    className="bg-transparent border-0 border-b outline-none focus:outline-none"
                    style={{
                      borderBottomWidth: focusedField === "name" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                      width: "120px",
                    }}
                  />{" "}
                  and I work with{" "}
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Company (optional)"
                    className="bg-transparent border-0 border-b outline-none focus:outline-none"
                    style={{
                      borderBottomWidth: focusedField === "company" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                      width: "180px",
                    }}
                  />
                  .
                </div>

                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(1) ? 1 : 0,
                    transform: formLinesVisible.includes(1) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  My email is{" "}
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Email"
                    required
                    className="bg-transparent border-0 border-b outline-none focus:outline-none"
                    style={{
                      borderBottomWidth: focusedField === "email" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                      width: "150px",
                    }}
                  />
                  .
                </div>

                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(2) ? 1 : 0,
                    transform: formLinesVisible.includes(2) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  I&apos;m looking to{" "}
                  <select
                    value={formData.intention}
                    onChange={(e) => handleInputChange("intention", e.target.value)}
                    onFocus={() => setFocusedField("intention")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="bg-transparent border-0 border-b outline-none focus:outline-none appearance-none cursor-pointer"
                    style={{
                      borderBottomWidth: focusedField === "intention" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: formData.intention ? "#3e2723" : "#999",
                      width: "220px",
                    }}
                  >
                    <option value="" disabled>
                      select your intention
                    </option>
                    {intentions.map((intention) => (
                      <option key={intention} value={intention}>
                        {intention}
                      </option>
                    ))}
                  </select>
                  ...
                </div>

                <div
                  className="text-[18px] leading-relaxed text-[#3e2723]"
                  style={{
                    fontFamily: '"Satoshi", sans-serif',
                    opacity: formLinesVisible.includes(3) ? 1 : 0,
                    transform: formLinesVisible.includes(3) ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 400ms ease-out, transform 400ms ease-out",
                  }}
                >
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us more about your project."
                    required
                    rows={4}
                    className="bg-transparent border-0 border-b outline-none focus:outline-none resize-none w-full"
                    style={{
                      borderBottomWidth: focusedField === "message" ? "2px" : "1px",
                      borderBottomColor: "#3e2723",
                      borderBottomStyle: "solid",
                      transition: "border-bottom-width 200ms ease-out",
                      fontFamily: '"Satoshi", sans-serif',
                      fontSize: "18px",
                      color: "#3e2723",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full px-8 py-4 transition-all duration-200 ease-out"
                  style={{
                    backgroundColor: "#f0660a",
                    color: "#fdfcfb",
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: "18px",
                    textTransform: "lowercase",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdfcfb";
                    e.currentTarget.style.border = "1px solid #f0660a";
                    e.currentTarget.style.color = "#f0660a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0660a";
                    e.currentTarget.style.border = "none";
                    e.currentTarget.style.color = "#fdfcfb";
                  }}
                >
                  [ send ]
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
      {!isSubmitted && <Footer />}
    </>
  );
}
