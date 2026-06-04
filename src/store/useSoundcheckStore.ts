import { create } from "zustand";

export interface Channel {
  id: number;
  name: string;
  type: "vocal" | "instrument" | "drum" | "backline";
  iconType: "mic" | "music" | "sliders" | "settings" | "radio";
  defaultVolume: number;
  patch: string;
  gridPos?: { r: number; c: number };
}

interface SoundcheckState {
  isPlaying: boolean;
  isMuted: boolean;
  activeChannelId: number;
  volumes: Record<number, number>;
  meters: Record<number, number>;
  channels: Channel[];
  setIsPlaying: (playing: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  setActiveChannelId: (id: number) => void;
  setVolume: (id: number, vol: number) => void;
  setMeters: (meters: Record<number, number>) => void;
  moveChannel: (id: number, r: number, c: number) => void;
  resetMeters: () => void;
}

export const useSoundcheckStore = create<SoundcheckState>((set) => ({
  isPlaying: false,
  isMuted: true,
  activeChannelId: 1,
  volumes: {
    1: 85, // Voz Principal
    2: 70, // Guitarra Eléctrica
    3: 75, // Bajo Eléctrico
    4: 60, // Batería
    5: 65, // Sintetizador
  },
  meters: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  channels: [
    {
      id: 1,
      name: "Voz Principal",
      type: "vocal",
      iconType: "mic",
      defaultVolume: 85,
      patch: "CH 01 / XLR-Shure Beta58",
      gridPos: { r: 2, c: 2 },
    },
    {
      id: 2,
      name: "Guitarra Eléctrica",
      type: "instrument",
      iconType: "music",
      defaultVolume: 70,
      patch: "CH 02 / XLR-Sennheiser e609",
      gridPos: { r: 1, c: 1 },
    },
    {
      id: 3,
      name: "Bajo Eléctrico",
      type: "backline",
      iconType: "sliders",
      defaultVolume: 75,
      patch: "CH 03 / Jack-Radial ProDI",
      gridPos: { r: 1, c: 3 },
    },
    {
      id: 4,
      name: "Batería (Groove)",
      type: "drum",
      iconType: "radio",
      defaultVolume: 60,
      patch: "CH 04 / XLR-Audix D6",
      gridPos: { r: 0, c: 2 },
    },
    {
      id: 5,
      name: "Sintetizador",
      type: "instrument",
      iconType: "settings",
      defaultVolume: 65,
      patch: "CH 05 / 2x Jack-Radial StereoDI",
      gridPos: { r: 2, c: 4 },
    },
  ],

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsMuted: (muted) => set({ isMuted: muted }),
  setActiveChannelId: (id) => set({ activeChannelId: id }),
  setVolume: (id, vol) =>
    set((state) => ({
      volumes: { ...state.volumes, [id]: vol },
    })),
  setMeters: (newMeters) => set({ meters: newMeters }),
  moveChannel: (id, r, c) =>
    set((state) => ({
      channels: state.channels.map((ch) =>
        ch.id === id
          ? { ...ch, gridPos: { r, c } }
          : ch.gridPos?.r === r && ch.gridPos?.c === c
          ? { ...ch, gridPos: undefined } // Quitar solapamientos
          : ch
      ),
    })),
  resetMeters: () =>
    set({
      meters: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }),
}));
