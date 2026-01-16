import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactLenis } from "./lenis-provider";
import Navigation from "@/components/Navigation";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://monk.haus"),
  title: {
    default: "MONK | HAUS",
    template: "%s | MONK HAUS",
  },
  description: "Digital artifact foundry based in Craiova. We build raw, friction-heavy web experiences. No templates. No cookies. Pure signal.",
  keywords: [
    "Monk Haus",
    "Web Design Craiova",
    "Digital Agency Romania",
    "Brutalist Web Design",
    "Next.js Developers",
    "WebGL",
    "Creative Studio",
    "Anti-Template",
  ],
  authors: [{ name: "Monk Haus", url: "https://monk.haus" }],
  creator: "Monk Haus",
  publisher: "Monk Haus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monk.haus",
    title: "MONK | HAUS",
    description: "Digital artifact foundry. We ship code.",
    siteName: "MONK HAUS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Monk Haus Digital Debris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MONK | HAUS",
    description: "Digital artifact foundry. We ship code.",
    images: ["/og-image.jpg"],
    creator: "@monk_haus",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="noise-overlay" />
        <ReactLenis root>
          {/* Wrapping children in a div resolves the type mismatch error */}
          <div>
            <Navigation />
            {children}
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}