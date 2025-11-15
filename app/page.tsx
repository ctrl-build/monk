import type { Metadata } from "next";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Monk – A Studio for Intentional Web Design & Development.",
  description: "Monk is a web design and development studio. We build with intention, clarity, and an uncompromising commitment to the craft. Our process is the product.",
  alternates: {
    canonical: "https://monk.haus",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Footer />
    </>
  );
}
