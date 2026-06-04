import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Sliders, Activity, ArrowRight } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="violet" className="uppercase tracking-widest font-mono text-[10px] px-3 py-1">
          Funciones clave
        </Badge>
        <h2 className="text-3xl md:text-4xl font-extrabold font-space-grotesk text-neutral-900 tracking-tight">
          Diseñado por ingenieros para el show en vivo.
        </h2>
        <p className="text-neutral-600 text-base md:text-lg">
          Olvídate de las hojas de papel arrugadas y de los emails interminables de última hora. CodaSync mantiene a todo tu staff en la misma frecuencia de sonido.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <Card className="bg-white border-neutral-200/80 hover:border-violet-500/40 hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
          <CardHeader className="p-6 md:p-8">
            <div className="size-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
              <Layers className="size-6" />
            </div>
            <CardTitle className="text-xl font-bold font-space-grotesk text-neutral-900 mb-3">
              Stage Plot Digital e Interactivo
            </CardTitle>
            <CardDescription className="text-neutral-600 text-sm leading-relaxed">
              Diseña el mapa físico de tu banda en el escenario mediante una interfaz visual intuitiva. Ubica monitores, micrófonos e instrumentos con precisión milimétrica y comparte cambios en tiempo real con el venue.
            </CardDescription>
          </CardHeader>
          <div className="px-6 md:px-8 pb-8">
            <div className="h-[2px] bg-neutral-100 w-full group-hover:bg-violet-600/30 transition-colors duration-300 mb-4" />
            <span className="text-xs font-mono font-bold text-violet-600 group-hover:text-violet-700 inline-flex items-center gap-1 cursor-pointer">
              Aprender más <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Card>

        <Card className="bg-white border-neutral-200/80 hover:border-violet-500/40 hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
          <CardHeader className="p-6 md:p-8">
            <div className="size-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
              <Sliders className="size-6" />
            </div>
            <CardTitle className="text-xl font-bold font-space-grotesk text-neutral-900 mb-3">
              Parcheo e Input List Inteligente
            </CardTitle>
            <CardDescription className="text-neutral-600 text-sm leading-relaxed">
              Genera listas de canales automatizadas con especificaciones de microfonía, alimentación Phantom (+48V) y tipo de conexión. Asigna patches de manera inteligente y previene fallos técnicos antes de la prueba.
            </CardDescription>
          </CardHeader>
          <div className="px-6 md:px-8 pb-8">
            <div className="h-[2px] bg-neutral-100 w-full group-hover:bg-violet-600/30 transition-colors duration-300 mb-4" />
            <span className="text-xs font-mono font-bold text-violet-600 group-hover:text-violet-700 inline-flex items-center gap-1 cursor-pointer">
              Aprender más <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Card>

        <Card className="bg-white border-neutral-200/80 hover:border-violet-500/40 hover:scale-[1.03] hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
          <CardHeader className="p-6 md:p-8">
            <div className="size-12 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
              <Activity className="size-6" />
            </div>
            <CardTitle className="text-xl font-bold font-space-grotesk text-neutral-900 mb-3">
              Monitoreo y Chat en Tiempo Real
            </CardTitle>
            <CardDescription className="text-neutral-600 text-sm leading-relaxed">
              Establece un canal de comunicación directo entre el ingeniero de FOH, monitores, el stage manager y los músicos. Coordina tiempos de montaje, cambios de setlist y alertas de soundcheck instantáneamente.
            </CardDescription>
          </CardHeader>
          <div className="px-6 md:px-8 pb-8">
            <div className="h-[2px] bg-neutral-100 w-full group-hover:bg-violet-600/30 transition-colors duration-300 mb-4" />
            <span className="text-xs font-mono font-bold text-violet-600 group-hover:text-violet-700 inline-flex items-center gap-1 cursor-pointer">
              Aprender más <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Card>

      </div>
    </section>
  );
}
export default FeaturesSection;
