import "./globals.css";

import { Space_Grotesk, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navBar";
import { Toaster } from "sonner";
import { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodaSync | Sincronización Logística para Shows en Vivo",
  description:
    "La plataforma SaaS definitiva para la industria musical. Conecta bandas, ingenieros de sonido y venues en tiempo real. Genera stage plots, input lists y cronogramas sin contratiempos.",
  keywords: [
    "logística musical",
    "stage plot generator",
    "soundcheck simulator",
    "input list creator",
    "live sound logistics",
    "ingeniero de sonido",
    "producción de eventos",
    "CodaSync",
  ],
  authors: [{ name: "CodaSync Technologies Inc." }],
  openGraph: {
    title: "CodaSync | Sincronización Logística para Shows en Vivo",
    description:
      "Unifica la logística técnica de tu show en vivo en tiempo real. Stage plots interactivos, listas de canales y cronogramas de pruebas de sonido perfectos.",
    url: "https://codasync.vercel.app",
    siteName: "CodaSync",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodaSync | Sincronización Logística para Shows en Vivo",
    description:
      "Unifica la logística técnica de tu show en vivo en tiempo real. Stage plots interactivos, listas de canales y cronogramas de pruebas de sonido perfectos.",
    creator: "@codasync",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        spaceGrotesk.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
