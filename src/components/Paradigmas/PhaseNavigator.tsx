// src/components/Paradigmas/PhaseNavigator.tsx

import React from 'react';
import { Sparkles } from 'lucide-react';
import { PhaseState } from './types/phase';
import { PhaseIndicator } from './PhaseElements';

interface PhaseNavigatorProps {
    phaseState: PhaseState;
    goToPhase: (phaseNum: number) => void;
}

const PHASE_MAP = [
    { num: 1, title: "Test Inicial" },
    { num: 2, title: "Tu Resultado" },
    { num: 3, title: "El Concepto" },
    { num: 4, title: "Ejemplo Real" },
    { num: 5, title: "Transforma Creencias" },
    { num: 6, title: "Plan de Acción" },
    { num: 7, title: "Reflexión Personal" },
    { num: 8, title: "Cierre + Bonus" },
];

export const PhaseNavigator: React.FC<PhaseNavigatorProps> = ({ phaseState, goToPhase }) => {
    return (
        <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" />
                    Fases del Módulo
                </h3>
                {PHASE_MAP.map(phase => (
                    <PhaseIndicator
                        key={phase.num}
                        phaseNum={phase.num}
                        title={phase.title}
                        phaseState={phaseState}
                        goToPhase={goToPhase}
                    />
                ))}
            </div>
        </div>
    );
};