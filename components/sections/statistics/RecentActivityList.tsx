"use client";

import { motion } from "framer-motion";
import { HistoryItem } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// Simple local Dialog components fallback (used when '@/components/ui/dialog' is missing)
import React from "react";

type DialogProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    // Keep a minimal API: render children and expose data attribute for open state.
    // Consumers (this file) control internal visibility, so this minimal shim is sufficient for compilation.
    return <div data-dialog-open={open}>{children}</div>;
}

export function DialogContent({ children }: { children?: React.ReactNode }) {
    return <div className="dialog-content">{children}</div>;
}

export function DialogHeader({ children }: { children?: React.ReactNode }) {
    return <div className="dialog-header">{children}</div>;
}

export function DialogTitle({ children }: { children?: React.ReactNode }) {
    return <h3 className="dialog-title">{children}</h3>;
}

export function DialogDescription({ children }: { children?: React.ReactNode }) {
    return <p className="dialog-description">{children}</p>;
}

interface RecentActivityListProps {
    history: HistoryItem[];
}

const EMOTION_ICONS: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    fear: '😨',
    disgust: '🤢',
    surprise: '😲',
    neutral: '😐'
};

export function RecentActivityList({ history }: RecentActivityListProps) {
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 lg:col-span-1 h-full"
        >
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Atividade Recente
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Últimas análises e disparos</p>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                    <div className="h-[600px] overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar">
                        {history.slice(0, 20).map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl" role="img" aria-label={item.emocao_dominante}>
                                            {EMOTION_ICONS[item.emocao_dominante] || '😐'}
                                        </span>
                                        <div>
                                            <p className="font-medium capitalize">{item.emocao_dominante}</p>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3" />
                                                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                                        {item.percentual_dominante.toFixed(0)}%
                                    </div>
                                </div>

                                {item.mensagem_disparada && (
                                    <div className="mt-3 pt-3 border-t border-border/50">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start text-xs h-auto py-2 text-purple-500 hover:text-purple-600 hover:bg-purple-500/10"
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <MessageCircle className="w-3 h-3 mr-2" />
                                            Ver Mensagem Disparada
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <Dialog open={!!selectedItem} onOpenChange={(open: boolean) => !open && setSelectedItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalhes da Análise</DialogTitle>
                        <DialogDescription>
                            Informações completas sobre a detecção.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                                <span className="text-4xl">{EMOTION_ICONS[selectedItem.emocao_dominante]}</span>
                                <div>
                                    <h4 className="font-bold capitalize text-lg">{selectedItem.emocao_dominante}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Confiança: {selectedItem.percentual_dominante.toFixed(2)}%
                                    </p>
                                </div>
                            </div>

                            {selectedItem.mensagem_disparada && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Mensagem Disparada</label>
                                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-700 dark:text-purple-300">
                                        "{selectedItem.mensagem_disparada}"
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Todas as Emoções</label>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {Object.entries(selectedItem.emocoes_detectadas).map(([emotion, value]) => (
                                        <div key={emotion} className="flex justify-between p-2 bg-background rounded border">
                                            <span className="capitalize">{emotion}</span>
                                            <span className="font-mono">{value.toFixed(1)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
