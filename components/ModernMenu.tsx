"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
    label: string;
    href: string;
}

interface SocialItem {
    label: string;
    href: string;
}

interface ModernMenuProps {
    items: MenuItem[];
    socialItems: SocialItem[];
    logoUrl?: string;
}

export function ModernMenu({
    items,
    socialItems,
    logoUrl = "/Sinout.svg",
}: ModernMenuProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={logoUrl}
                        alt="Logo"
                        width={100}
                        height={40}
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Desktop Menu Items */}
                <nav className="hidden md:flex items-center space-x-8">
                    {items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Social Links */}
                <div className="hidden md:flex items-center space-x-4">
                    {socialItems.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {social.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Trigger */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle className="text-left">
                                <Image
                                    src={logoUrl}
                                    alt="Logo"
                                    width={100}
                                    height={40}
                                    className="h-8 w-auto"
                                />
                            </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 mt-8">
                            {items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-8 pt-8 border-t border-border">
                            <h3 className="text-sm font-medium text-muted-foreground mb-4">
                                Socials
                            </h3>
                            <div className="flex space-x-4">
                                {socialItems.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {social.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}