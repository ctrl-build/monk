import { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
    title: "Index",
    description: "Master Index. Selected artifacts: Gaplens, Naath Models, Ctrl Build, Sort.lat. Directory of visual strategy and adaptive identity.",
    openGraph: {
        title: "Index | MONK HAUS",
        description: "Master Index of digital artifacts.",
        url: "https://monk.haus/work",
    },
};

export default function WorkPage() {
    return <WorkIndex />;
}