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
        title: "The Architecture of Silence",
        category: "Fine Art Photography",
        year: "2025",
        url: "https://gaplens.com",
        mainImage: "/assets/images/project-1.webp",
        detailImages: [
            "/assets/images/project-1-1.webp",
            "/assets/images/project-1-2.webp",
            "/assets/images/project-1-3.webp"
        ],
        services: ["Creative Direction", "Web Architecture", "Visual Identity", "Interaction Design", "Full-Stack Build"],
        context: "GapLens is a fine art photography studio dedicated to capturing the tension between material structure and ethereal light. They required an interface that behaved less like a website and more like a physical gallery—a space where the silence of the photography could be felt as much as seen.",
        outcome: "We engineered a stark, high-contrast digital archive that prioritizes negative space over traditional navigation. By utilizing a grid system built on architectural ratios, we created a platform where each frame commands absolute focus. The user experience is intentionally slowed, forcing a deeper engagement with the textures of concrete and the geometry of shadow. The result is a digital artifact that honors the solemn purity of the GapLens lens."
    },
    {
        slug: "naath-models",
        id: "02",
        client: "NAATH MODELS",
        title: "The New Vanguard",
        category: "Editorial Curation",
        year: "2026",
        url: "https://naathmodels.com",
        mainImage: "/assets/images/project-2.webp",
        detailImages: [
            "/assets/images/project-2-1.webp",
            "/assets/images/project-2-2.webp",
            "/assets/images/project-2-3.webp"
        ],
        services: ["Brand Strategy", "Digital Archive", "Boutique Experience", "Talent Management", "Editorial Direction"],
        context: "The fashion industry is often reduced to a catalogue of disposable statistics. NAATH MODELS was founded to reject this mass-recruitment model. They required a digital vanguard—a boutique platform that functions as a high-fashion curation, prioritizing the development of careers with precision and longevity over sheer volume.",
        outcome: "We built a quiet, high-contrast archive that mirrors the restraint of a physical darkroom. By utilizing a minimalist architectural grid and unpolished visual textures, we created a space where talent isn't just displayed, but nurtured. The experience is designed to be felt as a private viewing room—an editorial statement that honors the raw, unedited reality of the 'New Vanguard'."
    },
    {
        slug: "ctrl-build",
        id: "03",
        client: "CTRL BUILD",
        title: "Linguistic Deconstruction",
        category: "Adversarial Engine",
        year: "2025",
        url: "https://ctrl-build.com",
        mainImage: "/assets/images/project-3.webp",
        detailImages: [
            "/assets/images/project-3-1.webp",
            "/assets/images/project-3-2.webp",
            "/assets/images/project-3-3.webp"
        ],
        services: ["Interface Design", "Linguistic Engineering", "Brand Identity", "Adversarial Strategy", "Full-Stack Output"],
        context: "Artificial Intelligence is a statistical compression of the internet—a flattening of human expression into predictable patterns. CTRL BUILD is the rejection of that median. It functions as counter-surveillance, designed to deconstruct the algorithmic fingerprint of machine text and restore the irregular cadence of biological thought.",
        outcome: "We developed a clinical, industrial interface that mirrors the efficiency of a terminal while delivering complex semantic restructuring. By injecting variance—the 'bursts' and pauses of natural writing—we engineered an engine that doesn't just bypass detection, but elevates machine output into something fundamentally human. The result is a high-utility artifact for the modern informational war."
    },
    {
        slug: "sort-lat",
        id: "04",
        client: "SORT.LAT",
        title: "Adaptive Momentum",
        category: "Reactive Identity",
        year: "2026",
        url: "https://www.sort.lat",
        mainImage: "/assets/images/project-4.webp",
        detailImages: [
            "/assets/images/project-4-1.webp",
            "/assets/images/project-4-2.webp",
            "/assets/images/project-4-3.webp"
        ],
        services: ["Interface Design", "Contextual Logic", "Performance Strategy", "Full-Stack Build"],
        context: "Standard link profiles are biological fossils—stagnant, manual, and devoid of real-time context. SORT.LAT is a reactive engine designed to solve curation fatigue. It tracks link velocity and user momentum, automatically rearranging the profile in real-time to surface the most relevant content at the exact moment it's needed.",
        outcome: "We engineered a zero-config platform that eliminates layout shift and curation overhead. The interface is optimized for speed, pre-assembling the profile server-side before it reaches the viewport. By removing the friction of manual management, we created a self-optimizing digital presence that adapts to the creator's momentum instantly. No loading states. no manual dragging. Just pure, reactive flow."
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