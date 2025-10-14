// src/data/types.ts
import React from 'react';

export type ViewType = 'home' | 'course';

export interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'link';
}

export interface Module {
  id: number;
  title: string;
  type: 'video' | 'document' | 'text';
  content: React.ComponentType<any> | string;
  driveUrl?: string;
  duration?: string;
  resources?: Resource[];
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  modules: Module[];
}

export interface CourseData {
  title: string;
  subtitle: string;
  description?: string; // ✅ AGREGADO
  chapters: Chapter[];
}

// Tipo extendido para módulo seleccionado
export interface SelectedModule extends Module {
  chapterTitle: string;
  chapterId: number;
}