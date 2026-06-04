"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "¿Qué es un Stage Plot y cómo ayuda CodaSync?",
      answer:
        "Un Stage Plot es el mapa visual que representa la distribución física de tu banda en el escenario. CodaSync digitaliza este mapa y lo sincroniza con la lista de canales (Input List) en tiempo real, garantizando que el staff técnico del venue sepa exactamente qué micrófonos, monitores e instrumentos ubicar y en qué canales conectarlos antes de que llegues.",
    },
    {
      question: "¿El staff técnico del venue necesita una cuenta para ver la información?",
      answer:
        "No. CodaSync permite exportar tu documentación técnica a un PDF HD estructurado o compartir un enlace web dinámico accesible desde cualquier tablet o smartphone. El personal técnico del venue podrá consultar el parcheo, notas y plots sin necesidad de registrarse en la plataforma.",
    },
    {
      question: "¿Funciona en dispositivos móviles durante la prueba de sonido?",
      answer:
        "Sí. Toda la interfaz está diseñada de forma nativa para dispositivos móviles. Puedes actualizar que el guitarrista cambió su amplificador o añadir un canal de coros de último minuto directamente desde el escenario con tu teléfono, y la consola del ingeniero de sonido se actualizará al instante.",
    },
    {
      question: "¿Cuál es la diferencia entre el plan Tour y Venue Pro?",
      answer:
        "El plan Tour está pensado para bandas individuales y mánagers que viajan con su staff y necesitan plots ilimitados y sincronización para sus shows en ruta. El plan Venue Pro está diseñado para clubes de música, teatros y festivales que reciben múltiples agrupaciones por día y requieren herramientas de parcheo y gestión de festivales multi-banda.",
    },
    {
      question: "¿Cómo se gestiona el soporte prioritario ante emergencias de show?",
      answer:
        "Para los planes Tour y Venue Pro, ofrecemos canales de chat en tiempo real directamente en la consola con tiempos de respuesta menores a 5 minutos. Los usuarios de Venue Pro cuentan con soporte telefónico dedicado las 24 horas del día, los 7 días de la semana, ante cualquier contingencia de último minuto.",
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/50">
      
      {/* Cabecera */}
      <div className="text-center mb-12 space-y-4">
        <Badge variant="violet" className="uppercase tracking-widest font-mono text-[10px] px-3 py-1">
          Soporte & FAQ
        </Badge>
        <h2 className="text-3xl md:text-4xl font-extrabold font-space-grotesk text-neutral-900 tracking-tight">
          Preguntas Frecuentes
        </h2>
        <p className="text-neutral-600 text-sm md:text-base max-w-xl mx-auto">
          Resuelve tus dudas sobre la sincronización logística de CodaSync para tus espectáculos en vivo.
        </p>
      </div>

      {/* Contenedor del Acordeón */}
      <div className="space-y-4" role="presentation">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:border-slate-300"
            >
              {/* Botón de Pregunta */}
              <button
                type="button"
                role="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                onClick={() => handleToggle(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 outline-none focus:ring-2 focus:ring-violet-600 focus:bg-slate-50/50 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="size-5 text-violet-600 shrink-0" aria-hidden="true" />
                  <span className="text-sm sm:text-base font-bold text-neutral-900 font-space-grotesk tracking-wide leading-tight">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`size-8 rounded-full bg-slate-100 flex items-center justify-center text-neutral-500 transition-transform duration-300 shrink-0 ${
                    isOpen ? "rotate-180 bg-violet-100 text-violet-600" : ""
                  }`}
                >
                  <ChevronDown className="size-4" />
                </div>
              </button>

              {/* Contenedor de Respuesta con Transición Suave */}
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-96 opacity-100 border-t border-slate-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 sm:p-6 text-xs sm:text-sm text-neutral-600 leading-relaxed bg-slate-50/40">
                  {faq.answer}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
export default FaqSection;
