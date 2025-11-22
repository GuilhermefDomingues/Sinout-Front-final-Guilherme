"use client";

import { motion } from "framer-motion";
import { Target, Eye, MessageSquare, Smile, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem, Rule } from "./types";

interface MetricsGridProps {
    history: HistoryItem[];
    rules: Rule[];
}

export function MetricsGrid({ history, rules }: MetricsGridProps) {
    // Calculate metrics
    const today = new Date().toDateString();
    const todaysHistory = history.filter(item => new Date(item.timestamp).toDateString() === today);

    const totalDetections = todaysHistory.length;

    const averageConfidence = todaysHistory.length > 0
        ? todaysHistory.reduce((acc, item) => acc + item.percentual_dominante, 0) / todaysHistory.length
        : 0;

    const activeRules = rules.filter(r => r.ativo).length;

    // Calculate dominant sentiment
    const sentimentCounts = todaysHistory.reduce((acc, item) => {
        acc[item.emocao_dominante] = (acc[item.emocao_dominante] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const dominantSentiment = Object.entries(sentimentCounts).sort((a, b) => b[1] - a[1])[0];
    const dominantSentimentName = dominantSentiment ? dominantSentiment[0] : "N/A";

    const metrics = [
        {
            title: "Precisão Média da IA",
            value: `${averageConfidence.toFixed(1)}%`,
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            description: "Confiança nas detecções de hoje"
        },
        {
            title: "Detecções Hoje",
            value: totalDetections.toString(),
            icon: Eye,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            description: "Total de análises faciais realizadas"
        },
        {
            title: "Regras Ativas",
            value: activeRules.toString(),
            icon: MessageSquare,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
            description: "Palavras/frases programadas"
        },
        {
            title: "Sentimento Predominante",
            value: dominantSentimentName.charAt(0).toUpperCase() + dominantSentimentName.slice(1),
            icon: Smile,
            color: "text-green-500",
            bg: "bg-green-500/10",
            description: "Emoção mais frequente hoje"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {metrics.map((metric, index) => (
                <motion.div key={index} variants={item}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-transparent hover:border-t-purple-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {metric.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${metric.bg}`}>
                                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{metric.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {metric.description}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
