export interface Module {
    id: number;
    title: string;
    type: 'video' | 'document' | 'text';
    content: string;
    driveUrl?: string;
    youtubeUrl?: string;
    duration?: string;
    resources?: Resource[];
  }
  
  export interface Resource {
    title: string;
    url: string;
    type: 'pdf' | 'doc' | 'link';
  }
  
  export interface Chapter {
    id: number;
    title: string;
    description: string;
    icon?: string;
    modules: Module[];
  }
  
  export interface CourseData {
    title: string;
    subtitle: string;
    description?: string;
    chapters: Chapter[];
  }
  
  export type ViewType = 'home' | 'course';