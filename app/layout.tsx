import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monk.haus"),
  title: {
    default: "Monk – A Studio for Intentional Web Design & Development.",
    template: "%s – Monk",
  },
  description: "Monk is a web design and development studio. We build with intention, clarity, and an uncompromising commitment to the craft. Our process is the product.",
  alternates: {
    canonical: "https://monk.haus",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Monk",
    "url": "https://monk.haus",
    "logo": "https://monk.haus/assets/images/logo.png",
    "description": "Monk is a web design and development studio. We build with intention, clarity, and an uncompromising commitment to the craft.",
    "sameAs": [
      "https://instagram.com/_monk.haus_"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "project inquiry",
      "url": "https://monk.haus/contact"
    }
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/fonts/Schnyder-L-Demi.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/images/gaplens-full-bleed.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/images/ipower-full-bleed.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LLP85TEFBS"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LLP85TEFBS');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <PageTransition>
          <main className="pt-[60px] lg:pt-[80px]">{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
