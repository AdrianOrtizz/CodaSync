import React from "react";
import { HeroSection } from "@/components/heroSection";
import { StatsBanner } from "@/components/stats";
import { FeaturesSection } from "@/components/features";
import { ConceptShowcase } from "@/components/conceptShowcase";
import { FaqSection } from "@/components/faq";
import { FooterSection } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col items-center overflow-x-hidden w-full relative">
      {/* Líneas de cuadrícula técnica en el fondo de toda la landing page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0 h-[800px]" />

      {/* 1. Hero Section (Izquierda: Propuesta; Derecha: SoundcheckSimulator) */}
      <HeroSection />

      {/* 2. Banner de Estadísticas de Prueba Social */}
      <StatsBanner />

      {/* 3. Grid de Tarjetas de Características */}
      <FeaturesSection />

      {/* 4. Sección Alternante de Conceptos (Concept Showcase) */}
      <ConceptShowcase />

      {/* 5. Sección de Preguntas Frecuentes (FAQ Accordion) */}
      <FaqSection />

      {/* 6. Pie de Página */}
      <FooterSection />
    </div>
  );
}
