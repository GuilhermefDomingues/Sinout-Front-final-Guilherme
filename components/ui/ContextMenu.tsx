"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Moon, Sun, Share2, Settings, HelpCircle, Info, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function ContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        const handleScroll = () => {
            setVisible(false);
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const menuItems = [
        {
            label: "Voltar ao Topo",
            icon: ArrowUp,
            action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        },
        {
            label: theme === "dark" ? "Modo Claro" : "Modo Escuro",
            icon: theme === "dark" ? Sun : Moon,
            action: () => setTheme(theme === "dark" ? "light" : "dark"),
        },
        {
            label: "Compartilhar",
            icon: Share2,
            action: () => {
                if (navigator.share) {
                    navigator.share({
                        title: "Sinout",
                        text: "Confira o Sinout - Tecnologia acessível para comunicação.",
                        url: window.location.href,
                    });
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copiado para a área de transferência!");
                }
            },
        },
        {
            label: "Configurações",
            icon: Settings,
            action: () => router.push("/sistema"),
        },
        {
            label: "Ajuda",
            icon: HelpCircle,
            action: () => router.push("/ajuda"),
        },
        {
            label: "Sobre",
            icon: Info,
            action: () => router.push("/equipe"),
        },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{ top: position.y, left: position.x }}
                    className="fixed z-[9999] min-w-[220px] bg-background/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden p-1"
                >
                    <div className="flex flex-col gap-1">
                        {menuItems.map((item, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    item.action();
                                    setVisible(false);
                                }}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors group w-full text-left"
                            >
                                <div className="p-1.5 rounded-md bg-muted/50 group-hover:bg-background transition-colors">
                                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                                </div>
                                {item.label}
                            </motion.button>
                        ))}
                    </div>
                    <div className="mt-1 pt-1 border-t border-border/50 px-2 pb-1">
                        <div className="text-[10px] text-muted-foreground text-center">
                            Sinout © 2025
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
