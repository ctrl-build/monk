import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

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
    return <ContactForm />;
}