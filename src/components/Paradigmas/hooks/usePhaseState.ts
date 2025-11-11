// src/hooks/usePhaseState.ts

import { useReducer } from 'react';
import { PhaseState, PhaseAction } from '../types/phase';

const INITIAL_STATE: PhaseState = {
  currentPhase: 1,
  completedPhases: new Set([]),
  unlockedPhases: new Set([1])
};

const phaseReducer = (state: PhaseState, action: PhaseAction): PhaseState => {
  switch (action.type) {
    case 'UNLOCK_NEXT': {
      const { currentPhaseNum, totalPhases } = action.payload;
      const nextPhase = currentPhaseNum + 1;

      if (nextPhase > totalPhases) return state;

      return {
        ...state,
        completedPhases: new Set([...state.completedPhases, currentPhaseNum]),
        unlockedPhases: new Set([...state.unlockedPhases, nextPhase]),
        // Opcional: Avanzar automáticamente al siguiente paso al desbloquearlo
        currentPhase: nextPhase, 
      };
    }
    case 'GO_TO_PHASE': {
      const phaseNum = action.payload;
      if (state.unlockedPhases.has(phaseNum)) {
        return { ...state, currentPhase: phaseNum };
      }
      return state;
    }
    default:
      return state;
  }
};

export const usePhaseState = (totalPhases: number) => {
  const [phaseState, dispatch] = useReducer(phaseReducer, INITIAL_STATE);

  const unlockNextPhase = (currentPhaseNum: number) => {
    dispatch({ type: 'UNLOCK_NEXT', payload: { currentPhaseNum, totalPhases } });
  };

  const goToPhase = (phaseNum: number) => {
    dispatch({ type: 'GO_TO_PHASE', payload: phaseNum });
  };

  return {
    phaseState,
    unlockNextPhase,
    goToPhase,
  };
};