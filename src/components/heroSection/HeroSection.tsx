"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SoundcheckSimulator } from "../soundcheck";
import { motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";

export function HeroSection() {
  const openSignup = useModalStore((state) => state.openSignup);

  // Variantes para animación de entrada escalonada (Staggered Animation)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Retraso entre la aparición de cada elemento hijo
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Grid del Hero
          Responsividad:
          - Mobile: 1 columna.
          - Desktop (lg): 12 columnas (5 para texto, 7 para el simulador).
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Columna Izquierda Animada con Framer Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="neon"
              className="px-3 py-1 text-xs tracking-wider uppercase font-semibold"
            >
              ✨ Live Update 2026
            </Badge>
          </motion.div>

          {/* Título Principal */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 font-space-grotesk leading-none"
          >
            Sincroniza tu <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              Logística Técnica
            </span>{" "}
            <br />
            en vivo.
          </motion.h1>

          {/* Descripción */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-600 max-w-md"
          >
            La plataforma SaaS definitiva que unifica a bandas, ingenieros de sala y venues. Diseña Stage Plots dinámicos, gestiona patch lists y coordina pruebas de sonido sin contratiempos.
          </motion.p>

          {/* Botones de CTA */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2"
          >
            <Button
              variant="default"
              size="lg"
              onClick={openSignup}
              className="bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg hover:shadow-violet-500/20 px-8 py-6 text-base font-semibold transition-all duration-300 w-full sm:w-auto rounded-xl cursor-pointer"
            >
              Comenzar gratis
              <ArrowRight className="ml-2 size-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById("stats-banner");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 px-8 py-6 text-base font-semibold w-full sm:w-auto rounded-xl cursor-pointer"
            >
              Ver Demo
            </Button>
          </motion.div>

          {/* Atributos clave de marca */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-neutral-500 pt-4 border-t border-neutral-200/80 w-full"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" /> Sin tarjetas de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" /> Configuración en 3 minutos
            </span>
          </motion.div>
        </motion.div>

        {/* Columna Derecha: Entrada elástica e impactante del Simulador */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            type: "spring" as const,
            stiffness: 70,
            damping: 15,
          }}
          className="lg:col-span-7 w-full"
        >
          <SoundcheckSimulator />
        </motion.div>
        
      </div>
    </section>
  );
}
export default HeroSection;
