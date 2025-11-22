"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryItem } from "./types";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp } from "lucide-react";

interface VolumeChartProps {
    history: HistoryItem[];
}

export function VolumeChart({ history }: VolumeChartProps) {
    const [chartType, setChartType] = useState<'area' | 'line'>('area');

    const data = useMemo(() => {
        // Group by hour
        const hours = Array.from({ length: 24 }, (_, i) => i);
        const grouped = hours.map(hour => {
            const count = history.filter(item => {
                const date = new Date(item.timestamp);
                return date.getHours() === hour;
            }).length;
            return {
                hour: `${hour.toString().padStart(2, '0')}:00`,
                detections: count
            };
        });
        return grouped;
    }, [history]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 lg:col-span-2"
        >
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            Volume de Recorrência
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Detecções por hora nas últimas 24h</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={chartType === 'area' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType('area')}
                            className="text-xs"
                        >
                            Área
                        </Button>
                        <Button
                            variant={chartType === 'line' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType('line')}
                            className="text-xs"
                        >
                            Linha
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'area' ? (
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: any) => `${value}`} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        labelStyle={{ color: '#666' }}
                                    />
                                    <Area type="monotone" dataKey="detections" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDetections)" />
                                </AreaChart>
                            ) : (
                                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: any) => `${value}`} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        labelStyle={{ color: '#666' }}
                                    />
                                    <Line type="monotone" dataKey="detections" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: "#8b5cf6" }} activeDot={{ r: 8 }} />
                                </LineChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
