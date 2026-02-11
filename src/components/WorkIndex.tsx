'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const archive = [
    {
        id: "01",
        client: "GAPLENS",
        category: "Fine Art Photography",
        year: "2025",
        slug: "gaplens",
        image: "/assets/images/project-1.webp",
        status: "Public"
    },
    {
        id: "02",
        client: "NAATH MODELS",
        category: "Editorial Curation",
        year: "2026",
        slug: "naath-models",
        image: "/assets/images/project-2.webp",
        status: "Public"
    },
    {
        id: "03",
        client: "CTRL BUILD",
        category: "Adversarial Engine",
        year: "2025",
        slug: "ctrl-build",
        image: "/assets/images/project-3.webp",
        status: "Public"
    },
    {
        id: "04",
        client: "SORT.LAT",
        category: "Reactive Identity",
        year: "2026",
        slug: "sort-lat",
        image: "/assets/images/project-4.webp",
        status: "Public"
    }
];

export default function WorkIndex() {
    const [activeProject, setActiveProject] = useState<number | null>(null);

    return (
        <main className="relative w-full bg-void min-h-screen cursor-crosshair overflow-x-hidden selection:bg-signal selection:text-void">
            <section className="pt-32 pb-12 px-4 md:px-6 border-b border-newsprint/10">
                <div className="max-w-screen-xl mx-auto flex flex-col justify-end min-h-[20vh]">
                    <div className="flex justify-between items-end mb-8">
                        <span className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            Section: Work
                        </span>
                        <span className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            Total: {archive.length}
                        </span>
                    </div>

                    <h1 className="font-alpina text-newsprint leading-[0.8] mix-blend-difference">
                        <span className="block text-[15vw] md:text-[12vw] tracking-[-0.03em] lowercase">
                            master
                        </span>
                        <span className="block text-[15vw] md:text-[12vw] tracking-[-0.03em] lowercase ml-[8vw] text-newsprint/50 italic">
                            index
                        </span>
                    </h1>
                </div>
            </section>

            <section className="relative w-full px-4 md:px-6 py-24 min-h-[50vh]">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="hidden md:grid grid-cols-12 pb-4 border-b border-newsprint/20 font-mono text-[10px] text-newsprint/40 uppercase tracking-widest">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-5">Client</div>
                            <div className="col-span-4">Category</div>
                            <div className="col-span-2 text-right">Year</div>
                        </div>

                        <div className="flex flex-col">
                            {archive.map((project, index) => (
                                <ArchiveRow
                                    key={project.id}
                                    data={project}
                                    index={index}
                                    onHover={setActiveProject}
                                    onLeave={() => setActiveProject(null)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-4 relative">
                        <div className="sticky top-32 w-full aspect-[3/4] border border-newsprint/10 bg-void p-2">
                            <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-newsprint/60 uppercase tracking-widest bg-void px-1">
                                Visual Reference
                            </div>

                            <div className="relative w-full h-full overflow-hidden bg-newsprint/5">
                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeProject === null ? 'opacity-100' : 'opacity-0'}`}>
                                    <span className="font-mono text-[10px] text-newsprint/20 uppercase tracking-widest animate-pulse">
                                        ( Hover to View )
                                    </span>
                                </div>

                                {archive.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className={`absolute inset-0 transition-opacity duration-0 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.client}
                                            fill
                                            className="object-cover img-grain"
                                        />
                                        <div className="absolute inset-0 bg-void/10 mix-blend-overlay"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-newsprint/40"></div>
                            <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-newsprint/40"></div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full border-t border-newsprint/10 py-8 px-4 md:px-6">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-newsprint/40">
                    <span>Index: Full</span>
                    <span>Monk Haus © 2026</span>
                </div>
            </footer>
        </main>
    );
}

function ArchiveRow({ data, index, onHover, onLeave }: { data: any, index: number, onHover: any, onLeave: any }) {
    return (
        <Link
            href={`/work/${data.slug}`}
            className="group border-b border-newsprint/10 hover:bg-newsprint/5 transition-colors duration-0 cursor-pointer"
        >
            <div
                className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-0"
                onMouseEnter={() => onHover(index)}
                onMouseLeave={onLeave}
            >
                <div className="col-span-1 font-mono text-xs text-signal">
                    {data.id}
                </div>

                <div className="col-span-5">
                    <h3 className="font-alpina text-2xl md:text-4xl text-newsprint group-hover:italic transition-all duration-300">
                        {data.client}
                    </h3>
                    <span className="md:hidden block font-mono text-[10px] text-newsprint/40 uppercase mt-1">
                        {data.category}
                    </span>
                </div>

                <div className="hidden md:block col-span-4 font-mono text-xs text-newsprint/60 uppercase tracking-widest">
                    [{data.category}]
                </div>

                <div className="hidden md:block col-span-2 text-right font-mono text-xs text-newsprint/40">
                    {data.year}
                </div>
            </div>
        </Link>
    );
}