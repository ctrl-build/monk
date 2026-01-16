'use client';

import { useActionState } from 'react';
import { sendEmail } from '@/app/actions';

const initialState = {
    success: false,
    message: '',
};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendEmail, initialState);

    return (
        <main className="relative w-full bg-void min-h-screen cursor-crosshair overflow-x-hidden selection:bg-signal selection:text-void">

            <section className="relative pt-32 pb-12 px-4 md:px-6 border-b border-newsprint/10">
                <div className="max-w-screen-xl mx-auto flex flex-col justify-end min-h-[30vh]">
                    <div className="flex justify-between items-end mb-8">
                        <span className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            Form: 01_Inquiry
                        </span>
                        <span className="font-mono text-[10px] md:text-xs text-newsprint/60 uppercase tracking-widest">
                            Status: {state.success ? 'Filed' : 'Open'}
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
                    <div className="lg:col-span-7">
                        {state.success ? (
                            <div className="border border-newsprint/20 p-8 md:p-12 bg-newsprint/5">
                                <h3 className="font-mono text-newsprint/40 text-xs uppercase tracking-widest mb-8 border-b border-newsprint/10 pb-4">
                                    Submission Logged
                                </h3>
                                <p className="font-alpina text-2xl md:text-3xl text-newsprint leading-tight mb-8">
                                    Your brief has been filed. <br />
                                    We review every entry manually.
                                </p>
                                <div className="font-mono text-xs text-newsprint/60 space-y-4 uppercase tracking-widest border-l-2 border-signal pl-4 my-8">
                                    <div>
                                        <span className="block text-newsprint/30">Reference No.</span>
                                        <span className="text-newsprint">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <span className="block text-newsprint/30">Status</span>
                                        <span className="text-newsprint">Under Review (Pending)</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-8 text-xs font-mono border-b border-newsprint/40 pb-1 hover:text-signal hover:border-signal transition-colors"
                                >
                                    Start New Inquiry
                                </button>
                            </div>
                        ) : (
                            <form action={formAction} className="flex flex-col gap-12">
                                <div className="group relative">
                                    <label
                                        htmlFor="name"
                                        className="block font-mono text-xs text-newsprint/40 uppercase tracking-widest mb-4 group-focus-within:text-newsprint transition-colors"
                                    >
                                        01 / Name or Organization
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-transparent border-b border-newsprint/20 py-4 font-alpina text-2xl md:text-3xl text-newsprint focus:outline-none focus:border-signal transition-colors placeholder:text-newsprint/10"
                                        placeholder="Who is this?"
                                    />
                                </div>

                                <div className="group relative">
                                    <label
                                        htmlFor="email"
                                        className="block font-mono text-xs text-newsprint/40 uppercase tracking-widest mb-4 group-focus-within:text-newsprint transition-colors"
                                    >
                                        02 / Return Address (Email)
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-transparent border-b border-newsprint/20 py-4 font-alpina text-2xl md:text-3xl text-newsprint focus:outline-none focus:border-signal transition-colors placeholder:text-newsprint/10"
                                        placeholder="contact@domain.com"
                                    />
                                </div>

                                <div className="group relative">
                                    <label
                                        htmlFor="budget"
                                        className="block font-mono text-xs text-newsprint/40 uppercase tracking-widest mb-4 group-focus-within:text-newsprint transition-colors"
                                    >
                                        03 / Estimated Budget (EUR)
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        className="w-full bg-transparent border-b border-newsprint/20 py-4 font-alpina text-2xl md:text-3xl text-newsprint focus:outline-none focus:border-signal transition-colors appearance-none rounded-none cursor-pointer"
                                    >
                                        <option className="bg-void text-newsprint" value="Unknown">Select Range</option>
                                        <option className="bg-void text-newsprint" value="€2k — €5k">€2k — €5k</option>
                                        <option className="bg-void text-newsprint" value="€5k — €10k">€5k — €10k</option>
                                        <option className="bg-void text-newsprint" value="€10k — €25k">€10k — €25k</option>
                                        <option className="bg-void text-newsprint" value="€25k+">€25k+</option>
                                    </select>
                                </div>

                                <div className="group relative">
                                    <label
                                        htmlFor="message"
                                        className="block font-mono text-xs text-newsprint/40 uppercase tracking-widest mb-4 group-focus-within:text-newsprint transition-colors"
                                    >
                                        04 / Context
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-transparent border-b border-newsprint/20 py-4 font-alpina text-2xl md:text-3xl text-newsprint focus:outline-none focus:border-signal transition-colors placeholder:text-newsprint/10 resize-none"
                                        placeholder="Describe the project..."
                                    />
                                </div>

                                <div className="pt-8 flex items-center gap-6">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full md:w-auto px-12 py-6 bg-newsprint text-void font-mono text-xs uppercase tracking-[0.2em] hover:bg-signal hover:text-void transition-colors duration-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isPending ? 'Processing...' : 'Submit Inquiry'}
                                    </button>

                                    {state.message && !state.success && (
                                        <span className="text-signal font-mono text-xs uppercase tracking-widest animate-pulse">
                                            Error: Submission Failed. Retry.
                                        </span>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between h-full pt-12 lg:pt-0 lg:pl-12 lg:border-l border-newsprint/10">
                        <div className="mb-12">
                            <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest block mb-6">
                                Email
                            </span>
                            <a
                                href="mailto:hello@monk.haus"
                                className="block font-alpina text-4xl md:text-5xl text-newsprint hover:italic hover:text-signal transition-all"
                            >
                                hello@monk.haus
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-12">
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
                        </div>

                        <div>
                            <span className="font-mono text-xs text-newsprint/40 uppercase tracking-widest block mb-6">
                                Social
                            </span>
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <a
                                        href="https://instagram.com/_monk.haus_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-sm text-newsprint hover:text-bio uppercase tracking-widest transition-colors flex items-center gap-2 group"
                                    >
                                        Instagram
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-bio">→</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="w-full border-t border-newsprint/10 py-8 px-4 md:px-6">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-newsprint/40">
                    <span>Form: Contact_V1</span>
                    <span>Monk Haus © 2026</span>
                </div>
            </footer>
        </main>
    );
}