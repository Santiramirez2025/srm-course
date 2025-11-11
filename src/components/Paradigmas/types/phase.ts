// src/types/phase.ts

export interface PhaseState {
    currentPhase: number;
    completedPhases: Set<number>;
    unlockedPhases: Set<number>;
  }
  
  export interface PhaseData {
      phaseNum: number;
      title: string;
      icon: string;
      ref: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
  }
  
  export type PhaseAction = 
    | { type: 'UNLOCK_NEXT', payload: { currentPhaseNum: number, totalPhases: number } }
    | { type: 'GO_TO_PHASE', payload: number };