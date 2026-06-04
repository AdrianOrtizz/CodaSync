"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Radio } from "lucide-react";
import { LoginModal, SignupModal } from "../auth";
import { PlansModal } from "../plans";
import { useModalStore } from "@/store/useModalStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Consumir el store de Zustand para el manejo global de modales
  const {
    showLogin,
    showSignup,
    showPlans,
    setShowLogin,
    setShowSignup,
    setShowPlans,
    openLogin,
    openSignup,
    openPlans,
  } = useModalStore();

  // Navegación de secciones
  const navItems = [
    { label: "Soluciones", href: "#features" },
    { label: "Planes", href: "#planes" },
    { label: "Venues", href: "#venues" },
  ];

  return (
    <nav className="w-full border-b border-slate-200/80 flex flex-col justify-center bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Lado Izquierdo: Branding / Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="size-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-lg font-space-grotesk">
            <Radio className="size-4 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900 font-space-grotesk">
            CodaSync
          </span>
        </div>

        {/* Centro (Desktop): Enlaces de sección */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href === "#planes") {
                  e.preventDefault();
                  openPlans();
                }
              }}
              className="text-sm font-semibold text-neutral-600 hover:text-violet-600 transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-violet-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Lado Derecho (Desktop): CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={openLogin}
            className="text-violet-600 hover:text-violet-800 hover:bg-violet-50 font-semibold cursor-pointer"
          >
            Iniciar sesión
          </Button>
          <Button
            variant="default"
            onClick={openSignup}
            className="bg-violet-600 text-white hover:bg-violet-700 font-semibold rounded-xl px-5 shadow-sm cursor-pointer"
          >
            Prueba gratuita
          </Button>
        </div>

        {/* Botón de Menú Móvil (Hamburguesa) */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-neutral-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>

      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg px-4 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setIsOpen(false);
                  if (item.href === "#planes") {
                    e.preventDefault();
                    openPlans();
                  }
                }}
                className="text-base font-semibold text-neutral-700 hover:text-violet-600 transition-colors duration-200 py-2 border-b border-slate-50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                openLogin();
              }}
              className="text-violet-600 border-violet-200 hover:bg-violet-50 font-semibold py-5 rounded-xl w-full"
            >
              Iniciar sesión
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setIsOpen(false);
                openSignup();
              }}
              className="bg-violet-600 text-white hover:bg-violet-700 font-semibold py-5 rounded-xl w-full shadow-sm"
            >
              Prueba gratuita
            </Button>
          </div>
        </div>
      )}

      {/* --- INTEGRACIÓN DE MODALES DE AUTENTICACIÓN --- */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToOther={openSignup}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToOther={openLogin}
      />

      {/* --- INTEGRACIÓN DE MODAL DE PLANES --- */}
      <PlansModal
        isOpen={showPlans}
        onClose={() => setShowPlans(false)}
      />
    </nav>
  );
};
export default Navbar;
