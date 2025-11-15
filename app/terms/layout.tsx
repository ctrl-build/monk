import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Monk's terms of service. Review our terms and conditions for using our website.",
  alternates: {
    canonical: "https://monk.haus/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

