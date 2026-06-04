# 🎙️ CodaSync - Landing Page

CodaSync es una plataforma SaaS B2B/B2C diseñada específicamente para la industria de la música en vivo. Su objetivo es unificar y sincronizar la logística técnica entre **bandas, mánagers, ingenieros de sonido y venues** (teatros, clubes y salas de concierto). 

Esta landing page combina un estilo visual de **"dashboard institucional"** (fondos limpios de oficina, rejillas técnicas y bordes tenues) con acentos **violeta neón y verde esmeralda** que remiten a la música en vivo.

---

## 🛠️ Stack Tecnológico

* **Core**: Next.js 16 (App Router) + React 19 (TypeScript).
* **Estilos**: Tailwind CSS v4 + `class-variance-authority` (Mobile-First y animaciones integradas).
* **Manejo de Estado**: Zustand 5 (Control global de modales y triggers).
* **Animaciones**: Framer Motion 12 (Entradas elásticas, transiciones y físicas).
* **Notificaciones**: Sonner 2 (Toast global integrado con layout raíz).
* **Motor de Audio**: Web Audio API (Generador de síntesis de sonido analógico para soundchecks).
* **Accesibilidad (A11y)**: HTML5 Semántico + Atributos ARIA WCAG 2.1 (Focus traps en modales, navegación por teclado en stage plot).

---

## 📁 Estructura del Proyecto (Modularizada)

La base del código sigue una arquitectura de componentes modulares separados por dominios de negocio:

```bash
src/
├── app/
│   ├── globals.css          # Estilos globales y variables de tema Tailwind v4
│   ├── layout.tsx           # Layout principal, Toaster global de Sonner y Metadata
│   └── page.tsx             # Orquestador principal de la landing page
├── components/
│   ├── auth/                # Módulo de Autenticación
│   │   ├── LoginModal.tsx   # Modal de Login (con validaciones y login de Spotify)
│   │   ├── SignupModal.tsx  # Modal de Registro (con selector dinámico de perfil técnico)
│   │   └── index.ts         # Barril de exportaciones
│   ├── plans/               # Módulo de Membresías
│   │   ├── PlansModal.tsx   # Grilla comparativa de 3 columnas (Garage, Tour, Venue Pro)
│   │   └── index.ts
│   ├── soundcheck/          # Módulo del Simulador
│   │   ├── SoundcheckSimulator.tsx  # Blueprint Stage Plot y Consola de mezcla
│   │   └── index.ts
│   ├── stats/               # Módulo de Estadísticas
│   │   ├── StatsBanner.tsx  # Banner responsivo oscuro (2x2 en móvil, flex en desktop)
│   │   └── index.ts
│   ├── features/            # Módulo de Tarjetas de Características
│   │   ├── FeaturesSection.tsx # Tarjetas Shadcn con escalado y hover neón
│   │   └── index.ts
│   ├── conceptShowcase/     # Módulo Walkthrough
│   │   ├── ConceptShowcase.tsx # Filas alternas con mockups generados y checklists
│   │   └── index.ts
│   ├── heroSection/         # Módulo Cabecera
│   │   ├── HeroSection.tsx  # Textos y triggers con entradas escalonadas (Framer Motion)
│   │   └── index.ts
│   ├── navBar/              # Módulo Navegación
│   │   ├── NavBar.tsx       # Menú responsive colapsable y triggers globales
│   │   └── index.ts
│   └── ui/                  # Componentes base Shadcn
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts             # Utilidad cn (clsx + tailwind-merge)
└── store/
    └── useModalStore.ts     # Store de Zustand para control global de modales
```

---

## 💎 Funcionalidades Clave Implementadas

### 1. Simulador de Soundcheck y Stage Plot (`SoundcheckSimulator`)
* **Ubicación Dinámica**: Diseña el blueprint del escenario arrastrando instrumentos desde el sidebar y soltándolos en la cuadrícula de 4x5, o muévelos internamente.
* **Física de Caída**: Al soltar el canal, este rebota elásticamente en su celda usando animaciones de resorte de `framer-motion`.
* **Prueba de Sonido Sintética**: Al hacer clic en **"Iniciar Soundcheck"**, la consola emite un sonido rítmico sintetizado real en 100 BPM mediante **Web Audio API** (osciladores analógicos `sine`, `triangle` y `sawtooth` según el canal), con control deslizante de volumen individual y botón de silencio (`Mute`).
* **Medición LED**: Barras gráficas rebotan de manera realista con fluctuaciones aleatorias alrededor del volumen del fader.

### 2. Triggers de Modales con Zustand (`useModalStore`)
* El estado de los modales es **global**. El botón *"Comenzar gratis"* del Hero (en el nivel inferior del árbol) dispara directamente el modal de registro renderizado en el Navbar mediante acciones del store de Zustand, unificando la lógica de interacción de la página.

### 3. Accesibilidad Web (A11y WCAG Compliant)
* **Focus Trap**: Al abrir un modal, el tabulador de teclado se restringe al contenido del modal, impidiendo enfocar elementos ocultos del fondo.
* **Cierre Inteligente**: Presionar la tecla `Escape` cierra de inmediato cualquier modal activo.
* **Navegación del Escenario por Teclado**: Cada celda de la cuadrícula tiene `tabIndex={0}`. Al navegar con `Tab`, se muestra un anillo púrpura neón alrededor de la celda y presionar `Espacio` o `Enter` posiciona el instrumento activo en ese punto.
* **Atributos de Lector de Pantalla**: Uso riguroso de `role="dialog"`, `role="radiogroup"`, `role="radio"`, `aria-modal`, `aria-selected`, `aria-checked` y etiquetas descriptivas dinámicas en el escenario.

### 4. Validaciones de Formulario Estilizadas
* Se desactivaron las alertas por defecto del navegador (`noValidate`) y se implementó un sistema de errores en estado de React local. 
* Los inputs inválidos cambian a un color de borde rojizo destructivo (`border-destructive`) y muestran mensajes animados (`⚠️ mensaje`) con deslizamientos descendentes. Al escribir sobre un campo con error, este se limpia al instante.

### 5. SEO y Open Graph
* Configurado a través del objeto `metadata` de Next.js en el layout raíz:
  * Palabras clave musicales y optimización para motores de búsqueda.
  * Tarjetas Open Graph (`es_ES` / `website` / url corporativa) para previsualizaciones premium al compartir enlaces en Slack, WhatsApp o Twitter.

---

## ⚡ Instrucciones de Desarrollo

### Instalar dependencias:
```bash
pnpm install
```

### Ejecutar servidor de desarrollo:
```bash
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000) en el navegador para interactuar con la landing page.

### Construir para producción:
```bash
pnpm build
```
Generará una versión estática optimizada en el directorio `.next/` asegurando la validación estricta de TypeScript y el empaquetador Turbopack de Next.js.
