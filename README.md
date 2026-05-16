# Prueba Técnica Frontend - Capacítate para el empleo

Este repositorio contiene la resolución de la prueba técnica para la posición de Desarrollador Front-End. Se trata de un dashboard interactivo diseñado para consumir, renderizar y gestionar los cursos y certificaciones de un usuario final.

## 🎯 Objetivo del Proyecto
Desarrollar una interfaz moderna, responsiva y orientada a la experiencia de usuario (UX) para visualizar los datos provistos por el endpoint de prueba, aplicando buenas prácticas de desarrollo, manejo de estados asíncronos y control de versiones.

## 🛠️ Stack Tecnológico y Decisiones Arquitectónicas

Dado el límite de tiempo de la prueba y el objetivo de entregar código de la más alta calidad y libre de errores, opté por desarrollar la solución en **React**, tecnología listada como "deseable" en el perfil requerido.

* **Vite + React:** Elegido por su extrema rapidez de compilación y su peso ligero frente a herramientas más antiguas (CRA) o frameworks orientados a servidor (Next.js). Ideal para una Single Page Application (SPA) pura.
* **TypeScript:** Implementado para garantizar un tipado estricto (interfaces de `User`, `Course`, `Inscription`). Esto asegura un código autodescriptivo, previene errores en tiempo de ejecución y mejora la mantenibilidad.
* **Tailwind CSS:** Utilizado para un desarrollo rápido de UI. Permitió construir una interfaz 100% *Mobile-First*, responsiva y moderna, manteniendo un paquete CSS final sumamente ligero (ideal para usuarios con conexiones inestables).

## ✨ Características y UX (Puntos Clave)

Para manejar el volumen de datos sin saturar al usuario y ofrecer una experiencia de nivel producción, se implementaron patrones de diseño modernos:

1.  **Scroll Infinito (IntersectionObserver):** En lugar de renderizar todo el DOM de golpe o usar una paginación tradicional que añade fricción, la cuadrícula carga los cursos progresivamente conforme el usuario hace *scroll*, logrando un flujo de exploración ininterrumpido.
2.  **Navegación Moderna (Tabs + Chips):** Se optimizó la arquitectura de la información original de la plataforma. En lugar de anidar pestañas, se utilizaron "Chips" (píldoras) para filtrar rápidamente los cursos por su estado de progreso real (Próximos retos, En progreso, Completados).
3.  **Identidad Visual Dinámica:** La interfaz adapta sus colores (barras de progreso, botones y badges en modales) inyectando el `colorTheme` nativo de cada categoría de curso, unificando el branding de la plataforma.
4.  **Gamificación y Retención:** Se integró lógica de negocio directamente en la UI. Los cursos completados con calificación sobresaliente reciben una insignia de excelencia (⭐), mientras que los cursos inactivos por largos periodos muestran recordatorios amigables para incentivar su retoma.
5.  **Búsqueda en Tiempo Real:** Filtro en el lado del cliente (Client-side) que permite buscar cursos por título o categoría de forma instantánea.
6.  **Divulgación Progresiva (Modal):** La tarjeta principal muestra solo lo esencial. Los detalles técnicos (fechas, evaluaciones y descargas de certificados) se revelan únicamente cuando el usuario solicita más información al hacer clic.
7.  **Soporte PWA (Progressive Web App):** Se incluyó un `manifest.json` y meta tags base para dispositivos móviles. El proyecto está estructurado y listo para integrarse fácilmente con **Capacitor** para su empaquetado nativo.

## 🚀 Instalación y Ejecución

Para levantar este proyecto en un entorno local, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Victorbf4/cpe-prueba-frontend.git
   ```
2. Ingresa al directorio del proyecto:
   ```bash
   cd cpe-prueba-frontend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre la URL indicada en tu terminal (usualmente `http://localhost:5173/`).

## 💡 Áreas de Mejora (Roadmap)
Si este proyecto escalara a producción, sugeriría las siguientes implementaciones:
* Integrar TanStack Query (React Query) para la gestión avanzada de caché y reintentos automáticos de peticiones fallidas.
* Implementar *Skeleton Loaders* en lugar del *spinner* circular para una mejor percepción de velocidad en la carga inicial.
* Agregar pruebas unitarias con Vitest y React Testing Library para los componentes clave y utilidades de formateo.