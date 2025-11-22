"use client";

import { motion } from "framer-motion";
import { User, Calendar, Info } from "lucide-react";
import { Patient } from "./types";
import { Card } from "@/components/ui/card";

interface PatientHeaderProps {
    patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <Card className="bg-gradient-to-r from-background to-muted/50 border-l-4 border-l-purple-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <User className="w-32 h-32" />
                </div>
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-background">
                            {patient.foto_perfil ? (
                                <img src={patient.foto_perfil} alt={patient.nome} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                patient.nome.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-background ${patient.status ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            Dashboard de {patient.nome}
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Cadastrado em {new Date(patient.data_cadastro).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>Cuidador ID: {patient.id_cuidador}</span>
                            </div>
                            {patient.informacoes_adicionais && (
                                <div className="flex items-center gap-1">
                                    <Info className="w-4 h-4" />
                                    <span>{patient.informacoes_adicionais}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
