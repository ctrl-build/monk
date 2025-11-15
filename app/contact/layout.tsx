import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's create something intentional. Get in touch with Monk to discuss your project.",
  alternates: {
    canonical: "https://monk.haus/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

