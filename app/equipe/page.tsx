"use client";

import dynamic from 'next/dynamic';
import { ModernMenu } from "@/components/layout/Header";
import { ViteHero } from "@/components/sections/vite-hero";
import { ViteFeatures } from "@/components/sections/vite-features";
import { FrameworkLogos } from "@/components/sections/framework-logos";
import { CodeComparison } from "@/components/sections/code-comparison";
import { TechTeam } from "@/components/sections/tech-team";

const Footer7 = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer7));

/**
 * Página da Equipe.
 * Mostra como a equipe converte ideias em código (Pipeline Animation) e os membros.
 */
export default function TeamPage() {
    // Configuração dos links sociais
    const socialItems = [
        { label: "GitHub", href: "https://github.com" },
        { label: "Twitter", href: "https://twitter.com" },
        { label: "Discord", href: "https://discord.com" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">

            {/* Menu de navegação */}
            <ModernMenu items={[]} socialItems={socialItems} />

            <main className="flex-grow">
                {/* Hero Section com Pipeline Animation */}
                <ViteHero />

                {/* Framework Logos Marquee */}
                <FrameworkLogos />

                {/* Features Grid */}
                <ViteFeatures />

                {/* Code Comparison Section */}
                <CodeComparison />

                {/* Team Section */}
                <TechTeam />
            </main>

            {/* Rodapé */}
            <Footer7 className="mt-auto border-t border-border bg-muted/30" />
        </div>
    );
}
