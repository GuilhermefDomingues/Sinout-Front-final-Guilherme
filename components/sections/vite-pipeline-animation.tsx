"use client";

import { motion } from "framer-motion";

export function VitePipelineAnimation() {
    const inputs = [
        { label: "Ideia", y: 50 },
        { label: "Conceito", y: 100 },
        { label: "Planejamento", y: 150 },
        { label: "Tecnologia", y: 200 },
    ];

    const outputs = [
        { label: "React", y: 80 },
        { label: "TypeScript", y: 150 },
        { label: "ASP.NET", y: 220 },
    ];

    return (
        <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center relative select-none pointer-events-none">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full opacity-50" />

            <svg className="w-full h-full" viewBox="-100 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#646cff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#646cff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#bd34fe" stopOpacity="1" />
                    </linearGradient>

                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#41d1ff" />
                        <stop offset="100%" stopColor="#bd34fe" />
                    </linearGradient>

                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Input Lines (Left) */}
                {inputs.map((input, i) => {
                    const path = `M50 ${input.y} C 200 ${input.y} 250 150 350 150`;
                    return (
                        <g key={`input-${i}`}>
                            {/* Label Node */}
                            <g transform={`translate(50, ${input.y})`}>
                                <circle r="4" fill="#1e1e20" stroke="#646cff" strokeWidth="2" />
                                <text x="-10" y="4" textAnchor="end" fill="#a78bfa" fontSize="12" fontFamily="monospace" className="font-bold">{input.label}</text>
                            </g>

                            <path d={path} stroke="url(#line-gradient)" strokeWidth="1" strokeOpacity="0.3" />
                            <circle r="3" fill="#646cff">
                                <animateMotion
                                    dur="5s"
                                    repeatCount="indefinite"
                                    path={path}
                                    rotate="auto"
                                    begin={`${i * 0.2}s`}
                                    keyPoints="0;1;1"
                                    keyTimes="0;0.4;1"
                                    calcMode="linear"
                                />
                            </circle>
                        </g>
                    );
                })}

                {/* Central Box */}
                <g transform="translate(350, 100)">
                    <rect width="100" height="100" rx="16" fill="#1e1e20" stroke="#646cff" strokeWidth="2" className="drop-shadow-[0_0_15px_rgba(100,108,255,0.5)]" />
                    {/* Vite Logo Shape */}
                    <path transform="translate(15, 15) scale(0.7)" d="M50 10 L90 90 L50 70 L10 90 Z" fill="url(#logo-gradient)" filter="url(#glow)" />
                </g>

                {/* Output Lines (Right) */}
                {outputs.map((output, i) => {
                    const path = `M450 150 C 550 150 600 ${output.y} 750 ${output.y}`;
                    return (
                        <g key={`output-${i}`}>
                            <path d={path} stroke="#bd34fe" strokeWidth="1" strokeOpacity="0.3" />

                            {/* Output Particles */}
                            <circle r="3" fill="#bd34fe">
                                <animateMotion
                                    dur="5s"
                                    repeatCount="indefinite"
                                    path={path}
                                    rotate="auto"
                                    begin={`${i * 0.2}s`}
                                    keyPoints="0;0;1;1"
                                    keyTimes="0;0.5;0.9;1"
                                    calcMode="linear"
                                />
                            </circle>

                            {/* Output Node Label */}
                            <g transform={`translate(750, ${output.y})`}>
                                <circle r="4" fill="#1e1e20" stroke="#bd34fe" strokeWidth="2" />
                                <text x="10" y="4" textAnchor="start" fill="#a78bfa" fontSize="12" fontFamily="monospace" className="font-bold">{output.label}</text>
                            </g>
                        </g>
                    )
                })}

            </svg>
        </div>
    );
}
