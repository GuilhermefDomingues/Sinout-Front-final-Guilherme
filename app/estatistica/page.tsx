import { StatisticsDashboard } from "@/components/sections/statistics/StatisticsDashboard";
import { ModernMenu } from "@/components/layout/Header";
import dynamic from "next/dynamic";

const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

export default function StatisticsPage() {
    const socialItems = [
        { label: "GitHub", href: "https://github.com" },
        { label: "Twitter", href: "https://twitter.com" },
        { label: "Discord", href: "https://discord.com" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <ModernMenu items={[]} socialItems={socialItems} />

            <main className="flex-grow pt-20">
                <StatisticsDashboard />
            </main>

            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
        </div>
    );
}
