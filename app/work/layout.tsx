import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "The complete index of our work. View our chronicles in intentional web design and development.",
  alternates: {
    canonical: "https://monk.haus/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

