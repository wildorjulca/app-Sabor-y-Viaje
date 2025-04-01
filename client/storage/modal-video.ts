// storage/modal-video.ts
import { create } from 'zustand';

interface VideoInfo {
  title?: string;
  description?: string;
  [key: string]: any;
}

interface VideoState {
  isVisible: boolean;
  videoUrl: string;
  videoInfo: VideoInfo;
  showVideo: (url: string, info?: VideoInfo) => void;
  hideVideo: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  isVisible: false,
  videoUrl: '', // Asegúrate de pasar una URL válida
  videoInfo: {},
  showVideo: (url, info = {}) => set({ 
    isVisible: true, 
    videoUrl: url, 
    videoInfo: info 
  }),
  hideVideo: () => set({ 
    isVisible: false, 
    videoUrl: '', 
    videoInfo: {} 
  }),
}));