"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check, Zap, Music, Building } from "lucide-react";
import { toast } from "sonner";

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanItem {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  popular: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "violet";
}

export function PlansModal({ isOpen, onClose }: PlansModalProps) {
  const [mounted, setMounted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Control del scroll y trampa de foco
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Enfocar el botón de cerrar al abrir
      setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector("button[aria-label='Cerrar modal']") as HTMLElement;
        closeBtn?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        if (e.key === "Tab") {
          if (!modalRef.current) return;
          
          const focusableSelectors =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
          const focusableElements = modalRef.current.querySelectorAll(focusableSelectors);
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  // Mapear los planes según el ciclo de facturación seleccionado (Facturación Anual con 20% de descuento)
  const plans: PlanItem[] = [
    {
      name: "Garage",
      price: "$0",
      period: "Gratis para siempre",
      description: "Ideal para bandas independientes que ensayan y dan sus primeros shows.",
      icon: <Music className="size-5 text-neutral-600" />,
      popular: false,
      features: [
        "1 Stage Plot activo",
        "Hasta 8 canales (Input List)",
        "Compartir enlace público",
        "Soporte técnico comunitario",
      ],
      buttonText: "Comenzar Gratis",
      buttonVariant: "outline",
    },
    {
      name: "Tour",
      price: billingCycle === "monthly" ? "$29" : "$23",
      period: billingCycle === "monthly" ? "/ mes" : "/ mes, facturado anual",
      description: "Para agrupaciones activas en gira e ingenieros de sonido independientes.",
      icon: <Zap className="size-5 text-violet-600" />,
      popular: true,
      features: [
        "Stage Plots ilimitados",
        "Hasta 32 canales por plano",
        "Sincronización instantánea",
        "Historial de cambios técnicos",
        "Exportación rápida a PDF HD",
        "Soporte por chat prioritario",
      ],
      buttonText: billingCycle === "monthly" ? "Adquirir Plan Tour" : "Adquirir Tour Anual",
      buttonVariant: "violet",
    },
    {
      name: "Venue Pro",
      price: billingCycle === "monthly" ? "$89" : "$71",
      period: billingCycle === "monthly" ? "/ mes" : "/ mes, facturado anual",
      description: "Diseñado para clubes, salas de concierto, teatros y organizadores de festivales.",
      icon: <Building className="size-5 text-emerald-600" />,
      popular: false,
      features: [
        "Soporte multi-escenarios",
        "Parcheo inteligente automático",
        "Archivos compartidos con staff",
        "Integración de consolas digitales",
        "Personalización de marca",
        "Soporte telefónico 24/7",
      ],
      buttonText: billingCycle === "monthly" ? "Contactar Ventas" : "Adquirir Venue Pro Anual",
      buttonVariant: "default",
    },
  ];

  const handleSelectPlan = (planName: string) => {
    const cycleText = billingCycle === "monthly" ? "Mensual" : "Anual (20% Desc)";
    toast.success(`¡Plan ${planName} (${cycleText}) seleccionado!`, {
      description: `Iniciando el proceso de suscripción para el plan ${planName}.`,
    });
    onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plans-modal-title"
      ref={modalRef}
      className="fixed inset-0 z-[9999] overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Tarjeta del Modal */}
        <div className="relative w-full max-w-5xl bg-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-6 md:p-10 z-10 text-left my-8 mx-auto transform scale-100 transition-all duration-300 animate-in zoom-in-95 overflow-hidden">
          
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 rounded-lg p-1.5 hover:bg-slate-200/50 transition-all cursor-pointer z-20"
          >
            <X className="size-6" />
          </button>

          {/* Cabecera del Modal */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-mono font-bold text-violet-700 border border-violet-200 uppercase tracking-wider mb-3">
              Membresías
            </span>
            <h3 id="plans-modal-title" className="text-3xl font-extrabold font-space-grotesk text-neutral-900 leading-tight">
              Planes flexibles para cada nivel de sonido
            </h3>
            <p className="text-sm text-neutral-500 mt-2">
              Sincroniza tus espectáculos sin importar el tamaño de tu banda o el aforo de tu club.
            </p>
          </div>

          {/* --- INTERRUPTOR DE CICLO DE FACTURACIÓN (Toggle Mensual / Anual) --- */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span
              className={`text-xs font-bold transition-colors ${
                billingCycle === "monthly" ? "text-neutral-900" : "text-neutral-400"
              }`}
            >
              Facturación Mensual
            </span>
            
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              role="switch"
              aria-checked={billingCycle === "yearly"}
              aria-label="Alternar ciclo de facturación mensual o anual"
              className="relative w-12 h-6 bg-slate-200 dark:bg-neutral-800 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 cursor-pointer"
            >
              <div
                className={`w-4 h-4 bg-violet-600 rounded-full shadow-md transform transition-transform duration-300 ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-xs font-bold transition-colors flex items-center gap-1.5 ${
                billingCycle === "yearly" ? "text-neutral-900" : "text-neutral-400"
              }`}
            >
              Facturación Anual
              <Badge
                variant="neon"
                className="px-2 py-0 text-[8px] tracking-wider uppercase font-extrabold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
              >
                Ahorra 20%
              </Badge>
            </span>
          </div>

          {/* Grilla de Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "border-violet-600 shadow-xl shadow-violet-500/5 ring-1 ring-violet-600 scale-100 md:scale-[1.03]"
                    : "border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                    <Badge variant="violet" className="px-3 py-0.5 text-[9px] uppercase tracking-wider font-extrabold shadow-sm">
                      Más Popular
                    </Badge>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center" aria-hidden="true">
                      {plan.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {plan.name === "Garage" ? "Fácil" : plan.name === "Tour" ? "Pro" : "SaaS B2B"}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold text-neutral-900 font-space-grotesk">
                    {plan.name}
                  </h4>
                  
                  <p className="text-xs text-neutral-500 mt-1 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="my-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-neutral-900 font-space-grotesk">
                      {plan.price}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500 font-mono">
                      {plan.period}
                    </span>
                  </div>

                  <hr className="border-slate-100 mb-5" />

                  <ul className="space-y-3 mb-6" aria-label={`Características del plan ${plan.name}`}>
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-600">
                        <Check className="size-4.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.name)}
                  aria-label={`Seleccionar plan ${plan.name}`}
                  variant={plan.buttonVariant === "violet" ? "default" : plan.buttonVariant}
                  className={`w-full py-5 rounded-xl font-semibold text-xs tracking-wide transition-all cursor-pointer ${
                    plan.buttonVariant === "violet"
                      ? "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-md"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {plan.buttonText}
                </Button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
export default PlansModal;
