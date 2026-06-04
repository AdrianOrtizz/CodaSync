"use client";

import React from "react";
import { CheckCircle2, Smartphone, Layers, Clock } from "lucide-react";

interface Concept {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  features: string[];
}

export function ConceptShowcase() {
  const concepts: Concept[] = [
    {
      id: 1,
      title: "Dashboard en tiempo real",
      description:
        "¿El guitarrista cambió su amplificador a último minuto? Actualízalo desde tu teléfono y el ingeniero de sonido del venue recibirá una notificación al instante, evitando malentendidos de parcheo.",
      icon: <Smartphone className="size-6 text-violet-600" />,
      imageSrc: "/images/dashboard_mockup.png",
      imageAlt: "Dashboard en tiempo real mockup móvil",
      features: ["Sincronización instantánea", "Historial de cambios"],
    },
    {
      id: 2,
      title: "Generador de stage plots",
      description:
        "Una herramienta visual e intuitiva para diagramar tu escenario. Arrastra y suelta baterías, monitores y micrófonos, dejando claro qué necesitas y en qué posición exacta del escenario.",
      icon: <Layers className="size-6 text-violet-600" />,
      imageSrc: "/images/stage_plot_mockup.png",
      imageAlt: "Generador de stage plots mockup de interfaz",
      features: ["Librería de instrumentos estándar", "Exportación rápida a PDF"],
    },
    {
      id: 3,
      title: "Cronograma perfecto",
      description:
        "Define horarios claros para la carga de equipos (load-in), pruebas de sonido (soundcheck) y show. Asegura que la banda, el staff técnico y el personal del venue estén en la misma página.",
      icon: <Clock className="size-6 text-violet-600" />,
      imageSrc: "/images/scheduler_mockup.png",
      imageAlt: "Cronograma perfecto mockup calendario y timeline",
      features: ["Recordatorios automáticos", "Asignación de responsables"],
    },
  ];

  return (
    <section id="venues" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/50">
      
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
        <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-mono font-bold text-violet-700 border border-violet-100 uppercase tracking-widest">
          Coordinación total
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold font-space-grotesk text-neutral-900 tracking-tight">
          La logística de tus shows, bajo control absoluto
        </h2>
        <p className="text-neutral-600 text-base md:text-lg">
          Descubre cómo CodaSync ayuda a bandas, mánagers y venues a estar perfectamente alineados antes de que se enciendan las luces.
        </p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {concepts.map((concept, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={concept.id}
              className="bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              <div
                className={`lg:col-span-7 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center relative ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent pointer-events-none" />
                <img
                  src={concept.imageSrc}
                  alt={concept.imageAlt}
                  className="w-full h-auto object-cover max-h-[380px] rounded-2xl hover:scale-102 transition-transform duration-500"
                />
              </div>

              <div
                className={`lg:col-span-5 flex flex-col space-y-5 text-left ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="size-12 rounded-xl bg-violet-100 flex items-center justify-center mb-1">
                  {concept.icon}
                </div>

                <h3 className="text-2xl font-extrabold font-space-grotesk text-neutral-900 leading-tight">
                  {concept.title}
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                  {concept.description}
                </p>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {concept.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-sm font-semibold text-neutral-700"
                    >
                      <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
export default ConceptShowcase;
