import React from "react";

export function StatsBanner() {
  return (
    <section
      id="stats-banner"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10"
    >
      <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-6 sm:p-8 lg:p-10 border border-neutral-800 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 opacity-90" />

        <div className="relative z-10 grid grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-8 lg:gap-4 text-center">
          
          <div className="flex flex-col items-center space-y-1 lg:w-1/4">
            <span className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200">
              10k+
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 font-medium">
              Shows Sincronizados
            </span>
          </div>

          <div className="flex flex-col items-center space-y-1 lg:w-1/4 border-l border-neutral-800 lg:border-l lg:border-neutral-800">
            <span className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200">
              99.9%
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 font-medium">
              Fidelidad en Parcheo
            </span>
          </div>

          <div className="flex flex-col items-center space-y-1 lg:w-1/4 border-t border-neutral-800 lg:border-t-0 lg:border-l lg:border-neutral-800 pt-8 lg:pt-0 col-span-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200">
              1,200+
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 font-medium">
              Venues y Teatros Activos
            </span>
          </div>

          <div className="flex flex-col items-center space-y-1 lg:w-1/4 border-t border-neutral-800 lg:border-t-0 lg:border-l lg:border-neutral-800 pt-8 lg:pt-0 col-span-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-space-grotesk text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-200">
              &lt; 2ms
            </span>
            <span className="text-xs sm:text-sm text-neutral-400 font-medium">
              Latencia de Actualización
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
export default StatsBanner;
