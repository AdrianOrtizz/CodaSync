import React from "react";

export function FooterSection() {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-400 border-t border-neutral-800 mt-auto z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded bg-violet-600 flex items-center justify-center text-white font-bold text-lg font-space-grotesk">
            C
          </div>
          <span className="font-bold text-white tracking-wide font-space-grotesk">CodaSync</span>
        </div>
        <p className="text-xs text-neutral-500 text-center md:text-left">
          © {new Date().getFullYear()} CodaSync Technologies Inc. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 text-xs text-neutral-400 font-medium">
          <a href="#" className="hover:text-violet-400 transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-violet-400 transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-violet-400 transition-colors">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
export default FooterSection;
