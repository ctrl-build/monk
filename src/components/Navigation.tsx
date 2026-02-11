import Link from "next/link";

interface NavLinkProps {
    href: string;
    text: string;
    className?: string;
    isCTA?: boolean;
}

const NavLink = ({ href, text, className, isCTA }: NavLinkProps) => {
    const baseClasses = "fixed z-50 font-mono text-xs uppercase hover-snap px-2 py-1 transition-none";

    const ctaClasses = isCTA
        ? "bg-signal text-void hover:bg-newsprint hover:text-void"
        : "text-newsprint mix-blend-difference";

    return (
        <Link href={href} className={`${baseClasses} ${ctaClasses} ${className}`}>
            {text}
        </Link>
    );
};

export default function Navigation() {
    return (
        <nav className="pointer-events-none">
            <NavLink
                href="/"
                text="Monk"
                className="top-4 left-4 md:top-6 md:left-6 pointer-events-auto tracking-tighter"
            />

            <NavLink
                href="/work"
                text="Index"
                className="top-4 right-4 md:top-6 md:right-6 text-right pointer-events-auto tracking-widest"
            />

            <NavLink
                href="/ethos"
                text="Philosophy"
                className="bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-auto tracking-widest"
            />

            <NavLink
                href="/contact"
                text="Email Us"
                isCTA={true}
                className="bottom-4 right-4 md:bottom-6 md:right-6 pointer-events-auto tracking-normal"
            />
        </nav>
    );
}