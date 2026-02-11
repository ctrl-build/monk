import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 | MONK HAUS",
    description: "Error: Reference_Unknown",
};

export default function NotFound() {
    return (
        <main className="relative w-full h-screen bg-void flex flex-col items-center justify-center p-4 cursor-crosshair selection:bg-signal selection:text-void overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
                <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-newsprint/20"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-newsprint/20"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-newsprint/20"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-newsprint/20"></div>

            <div className="relative z-10 text-center space-y-8">
                <div className="font-mono text-xs text-newsprint/40 uppercase tracking-widest">
                    Error: Reference_Unknown
                </div>

                <h1 className="font-alpina text-[25vw] md:text-[20vw] leading-[0.8] text-newsprint mix-blend-difference select-none">
                    404
                </h1>

                <div className="space-y-2">
                    <p className="font-alpina text-2xl md:text-3xl text-newsprint">
                        The artifact you are looking for does not exist.
                    </p>
                    <p className="font-mono text-xs text-newsprint/60 uppercase tracking-widest">
                        It may have been archived or deleted.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-block border border-newsprint/20 px-8 py-4 font-mono text-xs uppercase tracking-widest text-newsprint hover:bg-newsprint hover:text-void transition-colors duration-0"
                    >
                        Return to Index
                    </Link>
                </div>
            </div>
        </main>
    );
}