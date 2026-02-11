import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Initiate contact. Project inquiries and collaboration requests.",
    openGraph: {
        title: "Contact | MONK HAUS",
        description: "Initiate contact. Project inquiries and collaboration requests.",
        url: "https://monk.haus/contact",
    },
};

export default function ContactPage() {
    return (
        <main className="relative w-full bg-void min-h-screen cursor-crosshair overflow-x-hidden selection:bg-signal selection:text-void">
            <section className="relative pt-32 pb-12 px-4 md:px-6 border-b border-newsprint/10">
                <div className="max-w-screen-xl mx-auto flex flex-col justify-end min-h-[30vh]">
                    <div className="flex justify-between items-end mb-8">
                        <span className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            Comms: Open
                        </span>
                        <span className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            Status: Online
                        </span>
                    </div>

                    <h1 className="font-alpina text-newsprint leading-[0.8] mix-blend-difference">
                        <span className="block text-[15vw] md:text-[12vw] tracking-[-0.03em] lowercase">
                            project
                        </span>
                        <span className="block text-[15vw] md:text-[12vw] tracking-[-0.03em] lowercase ml-[8vw] text-newsprint/50 italic">
                            inquiry
                        </span>
                    </h1>
                </div>
            </section>

            <section className="relative w-full px-4 md:px-6 py-24">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-12 flex flex-col items-start gap-12">
                        <p className="font-alpina text-2xl md:text-3xl text-newsprint leading-tight max-w-2xl">
                            We are currently accepting new projects.
                            <br />
                            Email us directly to initiate a conversation.
                        </p>

                        <a
                            href="mailto:hello@monk.haus"
                            className="group relative inline-block"
                        >
                            <span className="font-alpina text-5xl md:text-8xl text-newsprint group-hover:text-signal transition-colors duration-300">
                                hello@monk.haus
                            </span>
                            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-newsprint/20 group-hover:bg-signal transition-colors duration-300"></span>
                        </a>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full pt-12 border-t border-newsprint/10">
                            <div>
                                <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest block mb-4">
                                    Studio
                                </span>
                                <p className="font-mono text-sm text-newsprint/80 leading-relaxed">
                                    Craiova, Romania
                                </p>
                            </div>
                            <div>
                                <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest block mb-4">
                                    Time
                                </span>
                                <p className="font-mono text-sm text-newsprint/80 leading-relaxed">
                                    EET (UTC+2)<br />
                                    <span suppressHydrationWarning>
                                        {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest block mb-4">
                                    Social
                                </span>
                                <a
                                    href="https://instagram.com/_monk.haus_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-sm text-newsprint hover:text-signal uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                                >
                                    Instagram ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full border-t border-newsprint/10 py-8 px-4 md:px-6">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-newsprint/40">
                    <span>Mode: Direct_Link</span>
                    <span>Monk Haus © 2026</span>
                </div>
            </footer>
        </main>
    );
}