// tailwind.config.ts
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // <-- Asegúrate de que esta línea esté presente
  ],
  // ... resto de tu configuración
} satisfies Config;

export default config;
