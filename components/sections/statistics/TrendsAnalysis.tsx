"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem } from "./types";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TrendsAnalysisProps {
    history: HistoryItem[];
}

const EMOTION_COLORS: Record<string, string> = {
    happy: '#FCD34D', // Yellow
    sad: '#60A5FA',   // Blue
    angry: '#EF4444', // Red
    fear: '#8B5CF6',  // Purple
    disgust: '#10B981', // Green
    surprise: '#F472B6', // Pink
    neutral: '#9CA3AF'  // Gray
};

const EMOTION_LABELS: Record<string, string> = {
    happy: 'Felicidade',
    sad: 'Tristeza',
    angry: 'Raiva',
    fear: 'Medo',
    disgust: 'Nojo',
    surprise: 'Surpresa',
    neutral: 'Neutralidade'
};

export function TrendsAnalysis({ history }: TrendsAnalysisProps) {
    const data = useMemo(() => {
        // Group by day for the last 7 days
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toISOString().split('T')[0];
        });

        return days.map(day => {
            const dayHistory = history.filter(item => item.timestamp.startsWith(day));
            const counts: Record<string, number> = { date: day as any }; // Type assertion for recharts

            // Initialize counts
            Object.keys(EMOTION_COLORS).forEach(emotion => counts[emotion] = 0);

            dayHistory.forEach(item => {
                counts[item.emocao_dominante] = (counts[item.emocao_dominante] || 0) + 1;
            });

            return counts;
        });
    }, [history]);

    // Calculate simple trend (last day vs previous day average)
    const trend = useMemo(() => {
        if (data.length < 2) return { value: 0, isPositive: true };
        const lastDay = data[data.length - 1];
        const prevDay = data[data.length - 2];

        const totalLast = Object.values(lastDay).reduce((a, b) => (typeof b === 'number' ? a + b : a), 0) as number;
        const totalPrev = Object.values(prevDay).reduce((a, b) => (typeof b === 'number' ? a + b : a), 0) as number;

        if (totalPrev === 0) return { value: 100, isPositive: true };
        const percentChange = ((totalLast - totalPrev) / totalPrev) * 100;

        return {
            value: Math.abs(percentChange).toFixed(1),
            isPositive: percentChange >= 0
        };
    }, [data]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="col-span-1 lg:col-span-2 h-full"
        >
            <Card className="h-full border-l-4 border-l-blue-500 overflow-hidden relative group">
                {/* Background decoration inspired by MongoDB Atlas / Next.js */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />

                <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                Tendência Temporal de Emoções
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">Evolução das emoções nos últimos 7 dias</p>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${trend.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {trend.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span>{trend.value}% vs. ontem</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value: string) => new Date(value).toLocaleDateString(undefined, { weekday: 'short' })}
                                />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    labelStyle={{ color: '#333', fontWeight: 'bold', marginBottom: '5px' }}
                                    formatter={(value: number, name: string) => [value, EMOTION_LABELS[name] || name]}
                                    labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                {Object.keys(EMOTION_COLORS).map((emotion) => (
                                    <Line
                                        key={emotion}
                                        type="monotone"
                                        dataKey={emotion}
                                        stroke={EMOTION_COLORS[emotion]}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 6 }}
                                        name={EMOTION_LABELS[emotion]}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
