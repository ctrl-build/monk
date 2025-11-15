import type { Metadata } from "next";

const projectData: Record<string, { title: string; tags: string[] }> = {
  gaplens: {
    title: "GapLens",
    tags: ["design", "development"],
  },
  ipower: {
    title: "iPower",
    tags: ["design", "development", "strategy"],
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'gaplens' },
    { slug: 'ipower' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData[slug] || projectData.gaplens;
  const services = project.tags.join(" and ");

  return {
    title: `${project.title} – A Monk Chronicle.`,
    description: `The chronicle of ${project.title}. A study in ${services}, built with the Monk discipline.`,
    alternates: {
      canonical: `https://monk.haus/work/${slug}`,
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

