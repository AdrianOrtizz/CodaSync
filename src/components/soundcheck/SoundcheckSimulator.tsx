"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundcheckStore } from "@/store/useSoundcheckStore";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  Music,
  Sliders,
  Settings,
  Radio,
  GripVertical,
} from "lucide-react";

export function SoundcheckSimulator() {
  const {
    isPlaying,
    isMuted,
    activeChannelId,
    volumes,
    meters,
    channels,
    setIsPlaying,
    setIsMuted,
    setActiveChannelId,
    setVolume,
    setMeters,
    moveChannel,
    resetMeters,
  } = useSoundcheckStore();

  const [draggingChannelId, setDraggingChannelId] = useState<number | null>(
    null,
  );
  const [hoveredCell, setHoveredCell] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const [grabbedChannelId, setGrabbedChannelId] = useState<number | null>(null);

  const rowsCount = 4;
  const colsCount = 5;

  const audioCtxRef = useRef<AudioContext | null>(null);
  const seqTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getIcon = (
    iconType: "mic" | "music" | "sliders" | "settings" | "radio",
  ) => {
    switch (iconType) {
      case "mic":
        return <Mic className="size-4" />;
      case "music":
        return <Music className="size-4" />;
      case "sliders":
        return <Sliders className="size-4" />;
      case "settings":
        return <Settings className="size-4" />;
      case "radio":
        return <Radio className="size-4" />;
      default:
        return <Music className="size-4" />;
    }
  };

  const handleGridClick = (r: number, c: number) => {
    moveChannel(activeChannelId, r, c);
  };

  const handleDragStart = (channelId: number) => {
    setDraggingChannelId(channelId);
    setActiveChannelId(channelId);
  };

  const handleDragEnd = () => {
    setDraggingChannelId(null);
    setHoveredCell(null);
    setGrabbedChannelId(null);
  };

  const handleDrop = (r: number, c: number) => {
    if (draggingChannelId === null) return;
    moveChannel(draggingChannelId, r, c);
    setDraggingChannelId(null);
    setHoveredCell(null);
  };

  const triggerAudioNote = (
    ctx: AudioContext,
    frequency: number,
    volume: number,
    type: OscillatorType,
  ) => {
    if (isMuted || volume <= 0) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(
        (volume / 100) * 0.08,
        ctx.currentTime + 0.02,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn("Error running audio note", e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const nextMeters = { ...meters };
        channels.forEach((ch) => {
          const baseVol = volumes[ch.id] || 0;
          if (baseVol === 0) {
            nextMeters[ch.id] = 0;
          } else {
            const fluctuation = (Math.random() - 0.4) * 25;
            nextMeters[ch.id] = Math.max(
              5,
              Math.min(100, baseVol + fluctuation),
            );
          }
        });
        setMeters(nextMeters);
      }, 100);

      if (typeof window !== "undefined") {
        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioCtx();
          }
          const ctx = audioCtxRef.current;
          if (ctx.state === "suspended") {
            ctx.resume();
          }

          let step = 0;
          seqTimerRef.current = setInterval(() => {
            const currentChIdx = step % channels.length;
            const currentCh = channels[currentChIdx];
            const vol = volumes[currentCh.id] || 0;

            let freq = 150;
            let oscType: OscillatorType = "sine";

            if (currentCh.type === "vocal") {
              freq = 329.63;
              oscType = "triangle";
            } else if (currentCh.type === "instrument") {
              freq = 261.63 + currentCh.id * 50;
              oscType = "triangle";
            } else if (currentCh.type === "drum") {
              freq = 65.41;
              oscType = "sine";
            } else if (currentCh.type === "backline") {
              freq = 110.0;
              oscType = "sawtooth";
            }

            triggerAudioNote(ctx, freq, vol, oscType);
            step++;
          }, 300);
        }
      }

      return () => {
        clearInterval(interval);
        if (seqTimerRef.current) clearInterval(seqTimerRef.current);
      };
    } else {
      resetMeters();
      if (seqTimerRef.current) {
        clearInterval(seqTimerRef.current);
      }
    }
  }, [isPlaying, isMuted, volumes, channels]);

  useEffect(() => {
    return () => {
      if (seqTimerRef.current) clearInterval(seqTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative bg-neutral-950 text-neutral-100 rounded-2xl shadow-2xl border border-neutral-800 p-4 md:p-6 overflow-hidden select-none">
      {/* Glow decorativo de fondo */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Encabezado del Simulador */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
              CodaSync Console v2.0
            </span>
          </div>
          <h3 className="text-lg font-bold font-space-grotesk tracking-tight text-white mt-1">
            Simulador Interactivo de Stage Plot
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-neutral-400 border-neutral-800 font-mono text-[10px]"
          >
            Latencia: 1.8ms
          </Badge>
          <Badge
            variant="outline"
            className="text-violet-400 border-violet-900/50 bg-violet-950/20 font-mono text-[10px]"
          >
            Global Store
          </Badge>
        </div>
      </div>

      {/* Cuerpo del Simulador */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* 1. Panel de Canales y Faders */}
        <div
          role="region"
          aria-label="Controles de consola y parcheo"
          className="md:col-span-5 flex flex-col space-y-3 bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800"
        >
          <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase block mb-1">
            🎛️ Consola & Arrastre
          </span>

          {channels.map((ch) => {
            const isActive = ch.id === activeChannelId;
            const level = meters[ch.id] || 0;
            const isDragging = ch.id === draggingChannelId;

            return (
              <div
                key={ch.id}
                role="button"
                tabIndex={0}
                aria-selected={isActive}
                aria-label={`Canal ${ch.id}: ${ch.name}. Parcheo en ${ch.patch}. Volumen: ${volumes[ch.id]}%`}
                onClick={() => setActiveChannelId(ch.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveChannelId(ch.id);
                  }
                }}
                draggable={grabbedChannelId === ch.id}
                onDragStart={(e) => {
                  if (
                    (e.target as HTMLElement).tagName === "INPUT" ||
                    (e.target as HTMLElement).closest("input")
                  ) {
                    e.preventDefault();
                    return;
                  }
                  handleDragStart(ch.id);
                }}
                onDragEnd={handleDragEnd}
                onMouseLeave={() => setGrabbedChannelId(null)}
                onMouseUp={() => setGrabbedChannelId(null)}
                className={`group relative p-2.5 rounded-lg border transition-all duration-300 select-none outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent ${
                  isDragging
                    ? "opacity-35 bg-neutral-950 border-dashed border-neutral-700"
                    : isActive
                      ? "bg-violet-950/40 border-violet-600 text-white shadow-inner"
                      : "bg-neutral-950/40 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900/50"
                }`}
              >
                {/* Drag Handle */}
                <div
                  onMouseDown={() => setGrabbedChannelId(ch.id)}
                  onMouseUp={() => setGrabbedChannelId(null)}
                  onTouchStart={() => setGrabbedChannelId(ch.id)}
                  onTouchEnd={() => setGrabbedChannelId(null)}
                  className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-neutral-500 hidden sm:block"
                  aria-hidden="true"
                >
                  <GripVertical className="size-3.5" />
                </div>

                <div className="pl-0 sm:pl-3">
                  <div
                    onMouseDown={() => setGrabbedChannelId(ch.id)}
                    onMouseUp={() => setGrabbedChannelId(null)}
                    onTouchStart={() => setGrabbedChannelId(ch.id)}
                    onTouchEnd={() => setGrabbedChannelId(null)}
                    className="flex justify-between items-center mb-2 cursor-grab active:cursor-grabbing select-none"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1 rounded ${
                          isActive
                            ? "bg-violet-600 text-white"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {getIcon(ch.iconType)}
                      </span>
                      <span className="text-xs font-semibold tracking-wide truncate max-w-[100px] sm:max-w-none">
                        {ch.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500 truncate max-w-[80px]">
                      {ch.patch.split("/")[0]}
                    </span>
                  </div>

                  <div
                    className="space-y-1.5"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onDragStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sliders
                        className="size-3 text-neutral-600"
                        aria-hidden="true"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volumes[ch.id]}
                        aria-label={`Volumen de ${ch.name}`}
                        onChange={(e) =>
                          setVolume(ch.id, parseInt(e.target.value))
                        }
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onDragStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="w-full accent-violet-500 h-1 bg-neutral-800 rounded-lg cursor-pointer appearance-none outline-none focus:ring-1 focus:ring-violet-500"
                      />
                      <span className="text-[10px] font-mono text-neutral-400 w-5 text-right shrink-0">
                        {volumes[ch.id]}%
                      </span>
                    </div>

                    <div
                      className="h-1.5 bg-neutral-800 rounded-full overflow-hidden w-full relative"
                      aria-hidden="true"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 transition-all duration-75"
                        style={{ width: `${isPlaying ? level : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Plano del Escenario (Stage Plot) */}
        <div
          role="region"
          aria-label="Plano de ubicación de instrumentos"
          className="md:col-span-7 flex flex-col space-y-4 bg-neutral-900 border border-neutral-800 rounded-xl p-5 min-h-[360px]"
        >
          {/* Guía Superior (Fondo del Escenario) con espacio dedicado */}
          <div
            className="w-full border-b border-dashed border-neutral-800/80 pb-3 text-xs font-mono font-semibold tracking-widest text-neutral-400 text-center uppercase select-none flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span>⏮️</span>
            <span>Fondo del Escenario / Backline</span>
          </div>

          {/* Grilla Blueprint */}
          <div className="relative grid grid-rows-4 grid-cols-5 gap-1.5 py-1 h-[240px]">
            {Array.from({ length: rowsCount }).map((_, r) =>
              Array.from({ length: colsCount }).map((_, c) => {
                const occupiedChannel = channels.find(
                  (ch) => ch.gridPos?.r === r && ch.gridPos?.c === c,
                );
                const isTargetActive = activeChannelId === occupiedChannel?.id;

                const isDragActive = draggingChannelId !== null;
                const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;

                const activeChName =
                  channels.find((ch) => ch.id === activeChannelId)?.name ||
                  "seleccionado";
                const cellLabel = occupiedChannel
                  ? `Fila ${r + 1}, Columna ${c + 1}. Ocupado por ${occupiedChannel.name}.`
                  : `Fila ${r + 1}, Columna ${c + 1}. Vacía. Presiona Espacio o Enter para colocar ${activeChName} aquí.`;

                return (
                  <div
                    key={`${r}-${c}`}
                    tabIndex={0}
                    aria-label={cellLabel}
                    onClick={() => handleGridClick(r, c)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleGridClick(r, c);
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (hoveredCell?.r !== r || hoveredCell?.c !== c) {
                        setHoveredCell({ r, c });
                      }
                    }}
                    onDragLeave={() => {
                      if (hoveredCell?.r === r && hoveredCell?.c === c) {
                        setHoveredCell(null);
                      }
                    }}
                    onDrop={() => handleDrop(r, c)}
                    className={`relative rounded-md flex flex-col items-center justify-center border transition-all duration-200 outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent focus:z-20 ${
                      occupiedChannel
                        ? isTargetActive
                          ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-500/20 scale-105 z-10 cursor-grab active:cursor-grabbing"
                          : "bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-neutral-500 cursor-grab active:cursor-grabbing"
                        : isHovered
                          ? "bg-violet-600/30 border-violet-400 scale-105 z-10 border-solid shadow-lg shadow-violet-500/20"
                          : isDragActive
                            ? "bg-violet-950/15 border-dashed border-violet-500/40 hover:bg-violet-950/20"
                            : "bg-neutral-950/20 border-neutral-900/50 hover:bg-neutral-900/40 hover:border-neutral-800"
                    }`}
                    draggable={occupiedChannel ? true : undefined}
                    onDragStart={
                      occupiedChannel
                        ? () => handleDragStart(occupiedChannel.id)
                        : undefined
                    }
                    onDragEnd={occupiedChannel ? handleDragEnd : undefined}
                  >
                    <AnimatePresence mode="popLayout">
                      {occupiedChannel && (
                        <motion.div
                          key={occupiedChannel.id}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 16,
                          }}
                          className="flex flex-col items-center justify-center w-full h-full p-1"
                        >
                          <span className="p-0.5 shrink-0" aria-hidden="true">
                            {getIcon(occupiedChannel.iconType)}
                          </span>
                          <span className="text-[10px] font-semibold tracking-tight text-center max-w-[65px] truncate leading-none mt-1 text-neutral-200">
                            {occupiedChannel.name.split(" ")[0]}
                          </span>
                          {isPlaying &&
                            (meters[occupiedChannel.id] || 0) > 10 && (
                              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span
                                  className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
                                  aria-hidden="true"
                                ></span>
                              </span>
                            )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!occupiedChannel && isDragActive && !isHovered && (
                      <span
                        className="text-[8px] font-mono text-violet-500/40 font-bold select-none pointer-events-none"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    )}
                  </div>
                );
              }),
            )}
          </div>

          {/* Guía Inferior (Frente del Escenario) con espacio dedicado */}
          <div
            className="w-full border-t border-dashed border-neutral-800/80 pt-3 text-xs font-mono font-semibold tracking-widest text-neutral-400 text-center uppercase select-none flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span>⏭️</span>
            <span>Frente (Público ⬇️)</span>
          </div>

          {/* Indicaciones del Canal Activo */}
          <div className="bg-neutral-900/60 p-3 rounded-lg border border-neutral-800 text-xs">
            {(() => {
              const activeCh = channels.find((ch) => ch.id === activeChannelId);
              if (!activeCh) return null;
              return (
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="text-neutral-500 font-mono text-[10px]">
                      PARCHE ACTIVO:
                    </span>
                    <p className="font-semibold text-white tracking-wide mt-0.5">
                      {activeCh.patch}
                    </p>
                  </div>
                  <Badge
                    variant="violet"
                    className="font-mono text-[9px] uppercase px-2 py-0.5"
                  >
                    {activeCh.gridPos
                      ? `STAGE: Fila ${activeCh.gridPos.r + 1}, Col ${activeCh.gridPos.c + 1}`
                      : "Sin Ubicar"}
                  </Badge>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Controles de Soundcheck */}
      <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={
              isPlaying
                ? "Detener prueba de sonido"
                : "Iniciar prueba de sonido"
            }
            className={`rounded-xl px-5 py-5 text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold animate-pulse"
                : "bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="size-4 fill-neutral-950" aria-hidden="true" />
                Pausar Prueba
              </>
            ) : (
              <>
                <Play className="size-4 fill-neutral-950" aria-hidden="true" />
                Iniciar Soundcheck
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
            disabled={!isPlaying}
            aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
            className={`border border-neutral-800 rounded-xl size-10 flex items-center justify-center p-0 cursor-pointer ${
              isMuted
                ? "text-neutral-500 hover:text-neutral-400"
                : "text-emerald-400 hover:text-emerald-300 bg-emerald-950/20"
            }`}
          >
            {isMuted ? (
              <VolumeX className="size-4" aria-hidden="true" />
            ) : (
              <Volume2 className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-right">
          <div className="hidden sm:block">
            <span className="text-[10px] text-neutral-500 block font-mono">
              ESTADO DE PRUEBA
            </span>
            <span
              className={`text-xs font-semibold ${isPlaying ? "text-emerald-400" : "text-amber-500"}`}
            >
              {isPlaying ? "🎛️ PRUEBA ACTIVA (100 BPM)" : "💤 ESPERANDO INICIO"}
            </span>
          </div>
          {isPlaying && (
            <div
              className="flex gap-0.5 items-end h-6 w-8 pb-1 px-1"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 bg-violet-500 rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: `${300 + Math.random() * 500}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SoundcheckSimulator;
