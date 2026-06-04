"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { X, Mail, User, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToOther: () => void;
}

export function SignupModal({ isOpen, onClose, onSwitchToOther }: SignupModalProps) {
  const [role, setRole] = useState<"banda" | "ingeniero" | "venue">("banda");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [extraField, setExtraField] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; extraField?: string }>({});
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Control del scroll y trampa de foco (Accessibility Focus Trap)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setErrors({});

      // Enfocar el primer input al abrir el modal
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector("input") as HTMLElement;
        firstInput?.focus();
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
            // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            // Tab
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre completo es obligatorio.";
    }

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }

    if (!extraField.trim()) {
      newErrors.extraField =
        role === "banda"
          ? "El nombre de la banda es obligatorio."
          : role === "ingeniero"
          ? "La especialidad técnica es obligatoria."
          : "El nombre del establecimiento/venue es obligatorio.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Formulario incompleto", {
        description: "Revisa los campos marcados en rojo antes de enviar.",
      });
      return;
    }

    toast.success("¡Cuenta creada correctamente!", {
      description: `Tu perfil de ${role} para "${extraField}" está listo. Bienvenido a la banda.`,
    });

    setName("");
    setEmail("");
    setExtraField("");
    setErrors({});
    onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
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
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 z-10 text-left my-8 mx-auto transform scale-100 transition-all duration-300 animate-in zoom-in-95 overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 rounded-lg p-1 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* Cabecera */}
          <div className="text-center mb-5">
            <div className="inline-flex size-10 rounded-xl bg-violet-100 items-center justify-center text-violet-600 mb-3">
              <Sparkles className="size-5" />
            </div>
            <h3 id="signup-modal-title" className="text-2xl font-extrabold font-space-grotesk text-neutral-900">
              Comienza gratis
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Únete a las bandas y venues que ya sincronizan su sonido
            </p>
          </div>

          {/* Selector de Rol Técnico en formato accesible (Radiogroup) */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 text-center">
              Selecciona tu Perfil
            </label>
            <div
              role="radiogroup"
              aria-label="Perfil del usuario técnico"
              className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl"
            >
              {(["banda", "ingeniero", "venue"] as const).map((r) => {
                const isSelected = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setRole(r);
                      setExtraField("");
                      if (errors.extraField) setErrors((prev) => ({ ...prev, extraField: undefined }));
                    }}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all capitalize select-none cursor-pointer ${
                      isSelected
                        ? "bg-white text-violet-600 shadow-sm border border-slate-200/50"
                        : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {r === "banda" ? "Banda" : r === "ingeniero" ? "Ingeniero" : "Venue"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="signup-name"
                className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
              >
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="ej. Adrián Fernández"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "signup-name-error" : undefined}
                  className={`w-full bg-slate-50 border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:bg-white transition-all text-neutral-900 ${
                    errors.name
                      ? "border-destructive focus:border-destructive ring-2 ring-destructive/10"
                      : "border-slate-200 focus:border-violet-600"
                  }`}
                />
              </div>
              {errors.name && (
                <p
                  id="signup-name-error"
                  role="alert"
                  className="text-[11px] font-bold text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1"
                >
                  ⚠️ {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="ejemplo@correo.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "signup-email-error" : undefined}
                  className={`w-full bg-slate-50 border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:bg-white transition-all text-neutral-900 ${
                    errors.email
                      ? "border-destructive focus:border-destructive ring-2 ring-destructive/10"
                      : "border-slate-200 focus:border-violet-600"
                  }`}
                />
              </div>
              {errors.email && (
                <p
                  id="signup-email-error"
                  role="alert"
                  className="text-[11px] font-bold text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1"
                >
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-extra"
                className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
              >
                {role === "banda"
                  ? "Nombre de la Banda"
                  : role === "ingeniero"
                  ? "Especialidad (FOH, Monitores, etc.)"
                  : "Nombre del Club / Venue"}
              </label>
              <input
                id="signup-extra"
                type="text"
                value={extraField}
                onChange={(e) => {
                  setExtraField(e.target.value);
                  if (errors.extraField) setErrors((prev) => ({ ...prev, extraField: undefined }));
                }}
                placeholder={
                  role === "banda"
                    ? "ej. The Loud Riffs"
                    : role === "ingeniero"
                    ? "ej. Mezcla de FOH / Ingeniero de Sistemas"
                    : "ej. Teatro Gran Rex"
                }
                aria-invalid={!!errors.extraField}
                aria-describedby={errors.extraField ? "signup-extra-error" : undefined}
                className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm outline-none focus:bg-white transition-all text-neutral-900 ${
                  errors.extraField
                    ? "border-destructive focus:border-destructive ring-2 ring-destructive/10"
                    : "border-slate-200 focus:border-violet-600"
                }`}
              />
              {errors.extraField && (
                <p
                  id="signup-extra-error"
                  role="alert"
                  className="text-[11px] font-bold text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1"
                >
                  ⚠️ {errors.extraField}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-6 rounded-xl shadow-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 mt-2 cursor-pointer"
            >
              Obtener Prueba Gratuita
            </Button>
          </form>

          <p className="text-center text-xs text-neutral-500 mt-6">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={onSwitchToOther}
              className="font-bold text-violet-600 hover:underline cursor-pointer"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
export default SignupModal;
