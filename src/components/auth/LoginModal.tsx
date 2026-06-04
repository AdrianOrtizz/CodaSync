"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { X, Mail, Lock, Music } from "lucide-react";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToOther: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToOther }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
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

      // Manejador para cerrar con Escape y capturar navegación por Tab
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        if (e.key === "Tab") {
          if (!modalRef.current) return;
          
          // Buscar todos los elementos enfocables del modal
          const focusableSelectors =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
          const focusableElements = modalRef.current.querySelectorAll(focusableSelectors);
          
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            // Shift + Tab: si estamos en el primero, saltar al último
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            // Tab: si estamos en el último, saltar al primero
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

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Error al iniciar sesión", {
        description: "Por favor, corrige los campos marcados en rojo.",
      });
      return;
    }

    toast.success("¡Sesión iniciada con éxito!", {
      description: `Bienvenido de vuelta a la consola de CodaSync.`,
    });

    setEmail("");
    setPassword("");
    setErrors({});
    onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
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
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/10 rounded-full blur-[60px] pointer-events-none" />

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 rounded-lg p-1 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="size-5" />
          </button>

          {/* Cabecera */}
          <div className="text-center mb-6">
            <div className="inline-flex size-10 rounded-xl bg-violet-100 items-center justify-center text-violet-600 mb-3">
              <Music className="size-5" />
            </div>
            <h3 id="login-modal-title" className="text-2xl font-extrabold font-space-grotesk text-neutral-900">
              Bienvenido de vuelta
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Ingresa a la consola técnica para sincronizar tus shows
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
              >
                Email Corporativo / Artístico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="nombre@banda.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "login-email-error" : undefined}
                  className={`w-full bg-slate-50 border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:bg-white transition-all text-neutral-900 ${
                    errors.email
                      ? "border-destructive focus:border-destructive ring-2 ring-destructive/10"
                      : "border-slate-200 focus:border-violet-600"
                  }`}
                />
              </div>
              {errors.email && (
                <p
                  id="login-email-error"
                  role="alert"
                  className="text-[11px] font-bold text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1"
                >
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
                  className={`w-full bg-slate-50 border rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:bg-white transition-all text-neutral-900 ${
                    errors.password
                      ? "border-destructive focus:border-destructive ring-2 ring-destructive/10"
                      : "border-slate-200 focus:border-violet-600"
                  }`}
                />
              </div>
              {errors.password && (
                <p
                  id="login-password-error"
                  role="alert"
                  className="text-[11px] font-bold text-destructive mt-1.5 animate-in fade-in slide-in-from-top-1"
                >
                  ⚠️ {errors.password}
                </p>
              )}
              <div className="text-right mt-1.5">
                <a href="#" className="text-xs font-semibold text-violet-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-6 rounded-xl shadow-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300 mt-2 cursor-pointer"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="relative my-6 text-center">
            <span className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-100" />
            <span className="relative bg-white px-3 text-[10px] uppercase font-bold text-neutral-400">
              O continuar con
            </span>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              toast.info("Conectando con Spotify Web API...", {
                description: "Por favor, autoriza a CodaSync en la ventana emergente.",
              });
            }}
            aria-label="Iniciar sesión con Spotify"
            className="w-full border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded-xl flex items-center justify-center gap-2 py-5 font-semibold text-sm cursor-pointer"
          >
            <span className="size-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold" aria-hidden="true">
              S
            </span>
            Iniciar con Spotify
          </Button>

          <p className="text-center text-xs text-neutral-500 mt-6">
            ¿No tienes cuenta?{" "}
            <button
              onClick={onSwitchToOther}
              className="font-bold text-violet-600 hover:underline cursor-pointer"
            >
              Regístrate gratis
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
export default LoginModal;
