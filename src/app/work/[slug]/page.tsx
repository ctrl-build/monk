import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// --- DATA: THE ARCHIVE (Database) ---
const projects = [
    {
        slug: "gaplens",
        id: "01",
        client: "GAPLENS",
        title: "The Architecture of Sight",
        category: "Visual Strategy",
        year: "2025",
        url: "https://gaplens.com",
        mainImage: "/assets/images/project-1.webp",
        detailImages: [
            "/assets/images/project-1-1.webp",
            "/assets/images/project-1-2.webp",
            "/assets/images/project-1-3.webp"
        ],
        services: ["Art Direction", "Web Development", "Brand Identity"],
        context: "Gaplens required a digital presence that mirrored the precision of their optical engineering. We stripped away the marketing layers to reveal the raw structural integrity of their work.",
        outcome: "A stark, grid-based interface that functions less like a portfolio and more like a calibration tool. Instant response. Absolute clarity."
    },
    {
        slug: "naath-models",
        id: "02",
        client: "NAATH MODELS",
        title: "Raw Beauty, Unpolished",
        category: "Talent Management",
        year: "2026",
        url: "https://naath.pages.dev",
        mainImage: "/assets/images/project-2.webp",
        detailImages: [
            "/assets/images/project-2-1.webp",
            "/assets/images/project-2-2.webp",
            "/assets/images/project-2-3.webp"
        ],
        services: ["UX Design", "Custom Archive", "Casting Database"],
        context: "The fashion industry is obsessed with retouching. Naath represents the opposite. They needed a platform that honored the raw, unedited reality of their talent roster.",
        outcome: "We built a digital archive that feels like a physical lookbook found in a darkroom. High contrast, heavy grain, and an experience that forces the user to slow down and look."
    },
    {
        slug: "ctrl-build",
        id: "03",
        client: "CTRL BUILD",
        title: "Field Intelligence",
        category: "Communication Utility",
        year: "2025",
        url: "https://ctrl-build.com",
        mainImage: "/assets/images/project-3.webp",
        detailImages: [
            "/assets/images/project-3-1.webp",
            "/assets/images/project-3-2.webp",
            "/assets/images/project-3-3.webp"
        ],
        services: ["Interface Design", "Automation", "Motion"],
        context: "Construction management software is notoriously cluttered. Ctrl Build uses automated logic to clean up field notes. They needed an interface that felt industrial but organized.",
        outcome: "A utility for the job site. Monospaced typography meets construction safety orange. The interface feels like a physical tool—reliable, loud, and functional."
    },
    {
        slug: "sort-lat",
        id: "04",
        client: "SORT.LAT",
        title: "Contextual Identity",
        category: "Adaptive Profile",
        year: "2026",
        url: "https://www.sort.lat",
        mainImage: "/assets/images/project-4.webp",
        detailImages: [
            "/assets/images/project-4-1.webp",
            "/assets/images/project-4-2.webp",
            "/assets/images/project-4-3.webp"
        ],
        services: ["Product Design", "Performance", "Identity"],
        context: "Standard link profiles are static. Sort.lat is reactive. It tracks momentum and pushes the most relevant content to the top automatically, adapting to who is watching.",
        outcome: "A grid that eliminates layout shift. We built a system that pre-assembles the profile before it reaches the screen. No loading states. Just instant, stable content."
    }
];

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        return {
            title: "File Not Found",
        };
    }

    return {
        title: `${project.client} | Case File`,
        description: project.context,
        openGraph: {
            title: `${project.client} | MONK HAUS`,
            description: project.context,
            url: `https://monk.haus/work/${project.slug}`,
            images: [
                {
                    url: project.mainImage,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
    };
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    const currentIndex = projects.findIndex(p => p.slug === params.slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <main className="relative w-full bg-void min-h-screen cursor-crosshair overflow-x-hidden selection:bg-signal selection:text-void">

            {/* =========================================
          SECTION 1: HERO (THE ARTIFACT)
      ========================================= */}
            <section className="relative w-full h-[80vh] md:h-screen">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.mainImage}
                        alt={project.client}
                        fill
                        className="object-cover img-grain opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent"></div>
                </div>

                <div className="absolute inset-0 z-10 p-4 md:p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <Link href="/work" className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest hover:text-signal transition-colors">
                            ← Index
                        </Link>
                        <div className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            File_No: {project.id}
                        </div>
                    </div>

                    <div className="max-w-4xl">
                        <span className="block font-mono text-xs text-signal uppercase tracking-widest mb-4">
                            {project.client}
                        </span>
                        <h1 className="font-alpina text-[12vw] leading-[0.8] text-newsprint mix-blend-difference">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* =========================================
          SECTION 2: THE REPORT (CONTENT)
      ========================================= */}
            <section className="relative w-full px-4 md:px-6 py-24 md:py-32 border-b border-newsprint/10">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* --- LEFT COL: THE SPECS --- */}
                    <div className="lg:col-span-4 relative">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            <div className="border-t border-newsprint/20 pt-4">
                                <span className="font-mono text-[10px] text-newsprint/40 uppercase tracking-widest block mb-2">
                                    Discipline
                                </span>
                                <span className="font-alpina text-xl text-newsprint">
                                    {project.category}
                                </span>
                            </div>

                            <div className="border-t border-newsprint/20 pt-4">
                                <span className="font-mono text-[10px] text-newsprint/40 uppercase tracking-widest block mb-2">
                                    Output Year
                                </span>
                                <span className="font-alpina text-xl text-newsprint">
                                    {project.year}
                                </span>
                            </div>

                            <div className="border-t border-newsprint/20 pt-4">
                                <span className="font-mono text-[10px] text-newsprint/40 uppercase tracking-widest block mb-4">
                                    Services
                                </span>
                                <ul className="space-y-2">
                                    {project.services.map((service, i) => (
                                        <li key={i} className="font-mono text-xs text-newsprint/80 uppercase tracking-wider">
                                            [x] {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-8">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    className="inline-block w-full text-center border border-newsprint/20 py-4 font-mono text-xs uppercase tracking-widest text-newsprint hover:bg-signal hover:text-void hover:border-signal transition-all duration-0"
                                >
                                    View Live Artifact ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COL: THE NARRATIVE --- */}
                    <div className="lg:col-span-8 space-y-24">
                        <div>
                            <span className="font-mono text-xs text-signal uppercase tracking-widest block mb-6">
                                01 / Context
                            </span>
                            <p className="font-alpina text-2xl md:text-4xl text-newsprint leading-tight">
                                {project.context}
                            </p>
                        </div>

                        <div>
                            <span className="font-mono text-xs text-signal uppercase tracking-widest block mb-6">
                                02 / Output
                            </span>
                            <p className="font-mono text-sm md:text-base text-newsprint/80 leading-loose max-w-2xl">
                                {project.outcome}
                            </p>
                        </div>

                        {/* --- VISUAL EVIDENCE --- */}
                        <div className="space-y-8">
                            <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest block border-b border-newsprint/10 pb-2">
                                Visual_Reference
                            </span>

                            {/* Image 1 - Full Width */}
                            <div className="relative w-full aspect-video bg-newsprint/5">
                                <Image
                                    src={project.detailImages[0]}
                                    alt="Detail view 01"
                                    fill
                                    className="object-cover img-grain grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            {/* Grid of 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="relative w-full aspect-square bg-newsprint/5">
                                    <Image
                                        src={project.detailImages[1]}
                                        alt="Detail view 02"
                                        fill
                                        className="object-cover img-grain grayscale hover:grayscale-0 transition-all duration-500"
                                        style={{ objectPosition: 'left' }}
                                    />
                                </div>
                                <div className="relative w-full aspect-square bg-newsprint/5">
                                    <Image
                                        src={project.detailImages[2]}
                                        alt="Detail view 03"
                                        fill
                                        className="object-cover img-grain grayscale hover:grayscale-0 transition-all duration-500"
                                        style={{ objectPosition: 'center' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
          SECTION 3: NEXT PROJECT
      ========================================= */}
            <section className="w-full border-t border-newsprint/10">
                <Link href={`/work/${nextProject.slug}`} className="group block relative w-full h-[50vh] overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                        <Image
                            src={nextProject.mainImage}
                            alt={nextProject.client}
                            fill
                            className="object-cover img-grain"
                        />
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-4">
                        <span className="font-mono text-xs text-signal uppercase tracking-widest mb-4">
                            Next File
                        </span>
                        <h2 className="font-alpina text-6xl md:text-9xl text-newsprint group-hover:italic transition-all">
                            {nextProject.client}
                        </h2>
                        <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest mt-4 group-hover:text-newsprint transition-colors">
                            ( Click to Open )
                        </span>
                    </div>
                </Link>
            </section>

            <footer className="w-full border-t border-newsprint/10 py-8 px-4 md:px-6 bg-void">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-newsprint/40">
                    <span>Ref: {project.slug.toUpperCase()}</span>
                    <span>Monk Haus © 2026</span>
                </div>
            </footer>
        </main>
    );
}