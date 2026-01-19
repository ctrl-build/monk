import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const tickerItems = [
    "/// NOT FOR EVERYONE",
    "/// ANTI-TEMPLATE",
    "/// DIGITAL DEBRIS",
    "/// EST. 2025",
    "/// NO COOKIES",
    "/// RAW OUTPUT",
  ];

  return (
    <main className="relative w-full bg-void min-h-screen cursor-crosshair overflow-x-hidden selection:bg-signal selection:text-void">
      <section className="relative h-dvh w-full flex flex-col justify-between p-4 md:p-6 border-b border-newsprint/10">
        <div className="absolute top-20 right-4 md:top-24 md:right-6 z-0 text-right">
          <div className="font-mono text-[10px] md:text-xs leading-tight text-newsprint/60 uppercase tracking-widest space-y-4">
            <p>
              Status:<br />
              <span className="text-newsprint">Heavy Load</span>
            </p>
            <p>
              Origin:<br />
              <span className="text-newsprint">The Void</span>
            </p>
          </div>
        </div>

        <div className="mt-auto z-10 pb-20 md:pb-0">
          <h1 className="font-alpina text-newsprint leading-[0.85] mix-blend-difference">
            <span className="block text-[16vw] md:text-[14vw] tracking-[-0.03em] lowercase">
              heavy
            </span>
            <span className="block text-[16vw] md:text-[14vw] tracking-[-0.03em] lowercase ml-[4vw]">
              <span className="italic text-newsprint/50">mental</span>
            </span>
          </h1>
        </div>
      </section>

      <div className="w-full border-b border-newsprint/10 overflow-hidden bg-newsprint text-void py-3 flex user-select-none pointer-events-none">
        <div className="flex whitespace-nowrap animate-marquee min-w-full shrink-0 items-center">
          {tickerItems.map((item, i) => (
            <span key={i} className="mx-8 font-mono text-sm uppercase tracking-widest">{item}</span>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marquee min-w-full shrink-0 items-center">
          {tickerItems.map((item, i) => (
            <span key={`dup-${i}`} className="mx-8 font-mono text-sm uppercase tracking-widest">{item}</span>
          ))}
        </div>
      </div>

      <section className="relative w-full py-24 px-4 md:px-6">
        <div className="mb-16 flex justify-between items-end border-b border-newsprint/10 pb-4">
          <h2 className="font-alpina text-5xl md:text-7xl text-newsprint">
            Selected <br /> <span className="italic text-newsprint/50">Artifacts</span>
          </h2>
          <span className="hidden md:block font-mono text-xs text-newsprint/60 text-right">
            INDEX: 001 — 004 <br />
            (SCROLL TO VIEW)
          </span>
        </div>

        <div className="flex flex-col">
          <WorkItem
            id="01"
            client="GAPLENS"
            category="Fine Art Photography"
            description="The architecture of silence. Capturing the tension between light and shadow."
            year="2025"
            imageSrc="/assets/images/project-1.webp"
            url="https://gaplens.com"
          />
          <WorkItem
            id="02"
            client="NAATH MODELS"
            category="Editorial Curation"
            description="The new vanguard of fashion. Career longevity through boutique curation."
            year="2026"
            imageSrc="/assets/images/project-2.webp"
            url="https://naathmodels.com"
          />
          <WorkItem
            id="03"
            client="CTRL BUILD"
            category="Adversarial Engine"
            description="Neural deconstruction of algorithmic patterns. Restoring the human cadence."
            year="2025"
            imageSrc="/assets/images/project-3.webp"
            url="https://ctrl-build.com"
          />
          <WorkItem
            id="04"
            client="SORT.LAT"
            category="Reactive Identity"
            description="The link-in-bio that thinks for itself. Automated curation based on momentum."
            year="2026"
            imageSrc="/assets/images/project-4.webp"
            url="https://www.sort.lat"
          />
        </div>

        <div className="mt-24 text-center">
          <Link href="/work" className="inline-block border border-newsprint/30 px-8 py-4 font-mono text-xs tracking-widest uppercase text-newsprint hover:bg-newsprint hover:text-void transition-colors duration-0">
            View Full Archive
          </Link>
        </div>
      </section>

      <section className="relative w-full bg-newsprint text-void py-32 px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 border-b-2 border-void pb-6">
            <h2 className="font-alpina text-6xl md:text-8xl leading-[0.8]">
              Raw <br /> Material
            </h2>
            <div className="mt-8 md:mt-0 font-mono text-xs uppercase tracking-widest text-void/60">
              [ Operating_Principles_v2 ]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="group border-t border-void/20 pt-4">
              <span className="font-mono text-xs text-signal font-bold mb-4 block">01 / FRICTION</span>
              <p className="font-alpina text-2xl leading-tight mb-4 group-hover:italic transition-all">
                Efficiency is the enemy of memory.
              </p>
              <p className="font-mono text-xs leading-relaxed text-void/70">
                We don't build smooth experiences. We build sticky ones.
                If the user doesn't stop to look, you haven't designed anything.
              </p>
            </div>

            <div className="group border-t border-void/20 pt-4">
              <span className="font-mono text-xs text-signal font-bold mb-4 block">02 / DECAY</span>
              <p className="font-alpina text-2xl leading-tight mb-4 group-hover:italic transition-all">
                Pixels should age like concrete.
              </p>
              <p className="font-mono text-xs leading-relaxed text-void/70">
                The web is too shiny. We inject noise, grain, and structure
                to make digital spaces feel habitable, not just viewable.
              </p>
            </div>

            <div className="group border-t border-void/20 pt-4">
              <span className="font-mono text-xs text-signal font-bold mb-4 block">03 / TRUTH</span>
              <p className="font-alpina text-2xl leading-tight mb-4 group-hover:italic transition-all">
                Code is the only honest medium.
              </p>
              <p className="font-mono text-xs leading-relaxed text-void/70">
                No mockups. No "concept art." We design in the browser because
                that is where the truth lives.
              </p>
            </div>
          </div>

          <div className="mt-32 border border-void p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-void text-newsprint relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="z-10 text-center md:text-left">
              <h3 className="font-mono text-lg uppercase tracking-widest mb-2">Ready to break something?</h3>
              <p className="font-mono text-xs text-newsprint/60 max-w-md">
                The queue is open. Initiate the protocol.
              </p>
            </div>

            <Link
              href="/contact"
              className="z-10 px-8 py-4 bg-signal text-void font-mono text-sm uppercase tracking-widest hover:bg-newsprint hover:text-void transition-none"
            >
              Start Project
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-void text-newsprint py-32 px-4 md:px-6 border-b border-newsprint/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            <div className="md:col-span-4">
              <h2 className="font-alpina text-5xl md:text-6xl mb-6">Discipline</h2>
              <div className="font-mono text-xs text-newsprint/40 uppercase tracking-widest">
                Services & Practice
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">

              <div className="space-y-8">
                <h3 className="font-mono text-xs uppercase text-signal tracking-widest border-b border-newsprint/10 pb-2">
                  Design
                </h3>
                <ul className="font-mono text-sm space-y-4 text-newsprint/80">
                  <li className="block">Creative Direction</li>
                  <li className="block">Brand Identity</li>
                  <li className="block">Interface Design</li>
                  <li className="block">Visual Strategy</li>
                </ul>
              </div>

              <div className="space-y-8">
                <h3 className="font-mono text-xs uppercase text-signal tracking-widest border-b border-newsprint/10 pb-2">
                  Technology
                </h3>
                <ul className="font-mono text-sm space-y-4 text-newsprint/80">
                  <li className="block">Software Engineering</li>
                  <li className="block">Digital Archives</li>
                  <li className="block">Full-Stack Development</li>
                  <li className="block">Motion & Interaction</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      <footer className="relative w-full bg-void pt-24 pb-8 px-4 md:px-6">

        <div className="border-b border-newsprint/10 pb-24">
          <a href="mailto:hello@monk.haus" className="group block">
            <span className="font-mono text-xs text-newsprint/40 mb-4 block ml-2 uppercase tracking-widest">
              Inquiries
            </span>
            <h2 className="font-alpina text-[12vw] leading-[0.8] text-newsprint group-hover:text-signal transition-colors duration-0">
              hello@monk.haus
            </h2>
          </a>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 font-mono text-[10px] uppercase tracking-widest text-newsprint/60">

          <div className="flex flex-col gap-2">
            <span className="text-newsprint">Location</span>
            <span>
              Craiova, RO <br />
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
            </span>
          </div>

          <div className="flex gap-8">
            <a
              href="https://instagram.com/_monk.haus_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-newsprint transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="text-right">
            <span>Monk Haus © 2026</span> <br />
            <span className="text-newsprint/40">All Rights Reserved.</span>
          </div>

        </div>
      </footer>

    </main>
  );
}

function WorkItem({ id, client, category, description, year, imageSrc, url }: { id: string, client: string, category: string, description: string, year: string, imageSrc: string, url: string }) {
  return (
    <div className="group relative border-b border-newsprint/10 py-12 md:py-16 transition-colors hover:bg-newsprint/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-1">
          <span className="font-mono text-xs text-signal">({id})</span>
        </div>
        <div className="md:col-span-5 relative z-10">
          <a href={url} target="_blank" rel="noopener noreferrer" className="block w-fit">
            <h3 className="font-alpina text-4xl md:text-6xl text-newsprint group-hover:italic transition-all duration-300">
              {client}
            </h3>
          </a>
          <span className="block mt-2 font-mono text-xs text-newsprint/60 uppercase tracking-widest">[{category}]</span>
        </div>
        <div className="md:col-span-4 md:col-start-8 pointer-events-none md:pointer-events-auto">
          <p className="font-mono text-sm text-newsprint/80 leading-relaxed mb-6 max-w-sm">{description}</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-[4/3] bg-newsprint/10 overflow-hidden">
            <Image src={imageSrc} alt={`Artifact ${id}`} fill className="object-cover img-grain" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-void/10 mix-blend-overlay"></div>
          </a>
          <div className="mt-2 flex justify-between border-t border-newsprint/10 pt-2">
            <span className="font-mono text-[10px] text-newsprint/40">OUTPUT</span>
            <span className="font-mono text-[10px] text-newsprint/40">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}