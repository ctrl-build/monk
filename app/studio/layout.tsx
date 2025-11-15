import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Philosophy",
  description: "Our discipline is our freedom. The Monk philosophy—a relentless dedication to craft that clears the space for true creation.",
  alternates: {
    canonical: "https://monk.haus/studio",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

