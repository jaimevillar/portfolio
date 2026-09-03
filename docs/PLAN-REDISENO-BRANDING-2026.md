# Plan: Rediseño, Branding y Expansión del Portafolio — jvillar.dev

**Fecha:** Septiembre 2026
**Autor:** Jaime Villar (con Claude como copiloto)
**Estado:** Borrador para revisión

## 1. Resumen ejecutivo

jvillar.dev corre sobre un fork del template Gatsby v4 de Brittany Chiang. La paleta navy/teal (`#0a192f` / `#64ffda`) ya coincide con el sistema de marca `jv_` creado recientemente (icono, header, badge, resume), así que no partimos de cero. El trabajo real tiene cuatro frentes: **limpiar contenido heredado de la plantilla que no es de Jaime**, **formalizar la marca `jv_` en todo el sitio**, **definir un posicionamiento propio** ("de la idea a la realidad", CTO para proyectos / builder para ideas), y **expandir el portafolio** con dos proyectos propios como fundador — Havli App y Colabores — además de sincronizar experiencia laboral con el resume 2026. Se explora el rediseño visual con `/design` en 2-3 direcciones, y se evalúa una fase de internacionalización ES/EN.

## 2. Auditoría del estado actual

### 2.1 Stack técnico
- Gatsby 3.4 (2021), sin soporte activo del framework hace tiempo.
- Hospedado en Vercel (el `gatsby-plugin-netlify` en dependencias ya no se usa).
- `gatsby-config.js` local fue reconstruido a mano porque no estaba versionado — revisar que el de producción/Vercel coincida.

### 2.2 Hallazgo crítico: contenido de plantilla sin reemplazar
De los 14 proyectos marcados `showInProjects: true` en `content/projects/`, **13 no son de Jaime**: son el contenido de demostración original de Brittany Chiang (enlaces a `github.com/bchiang7/...`, textos en primera persona sobre su carrera — "My first portfolio...", su paso por Northeastern, Apple, etc.). Solo **Adopta+** es un proyecto real de Jaime.

Archivos a remover o reemplazar antes de cualquier expansión (verificado línea por línea):
`AMFM.md`, `AppleMusicEmbedPlayer.md`, `Fontipsums.md`, `GoogleKeepClone.md`, `HeadlessCMSMediumPost.md`, `NUWITSite.md`, `OctoProfile.md`, `OneCardForAll.md`, `ReactResume.md`, `Screentime.md`, `TimeToHaveMoreFun.md`, `v1.md`, `v2.md`, `v3.md`.

El `README.md` del repo también sigue siendo el de Brittany Chiang sin editar (título "brittanychiang.com - v4", su logo, su badge de deploy). El resto de `content/projects/` (los ~23 archivos con `showInProjects: false`) son también mayormente trabajo de agencia de ella (Upstatement, Harvard Business School, Vanderbilt, etc.) y deben auditarse antes de decidir si algo se conserva como referencia interna o se borra por completo.

Esto no es solo estético: mostrar el trabajo de otra persona como parte del propio portafolio es un problema de credibilidad que conviene resolver primero.

### 2.3 Experiencia laboral desincronizada
`content/jobs/` tiene 4 entradas (Adopta+, IASA, Propers, Ubiqua) contra 7 en el resume 2026. Diferencias puntuales:
- Faltan en el sitio: **InTech Ideas** (Jan 2026-presente), Nueraly Labs, Good Citizen, SAI Innovación.
- IASA tiene fechas distintas: sitio dice "Dec 2019 - May 2024", resume dice "Dec 2022 - May 2024".
- Adopta+ aparece en el sitio pero no en el resume 2026 en absoluto.

### 2.4 Activos de marca ya disponibles
Icono `jv_` (512×512), header `jvillar.dev` (4096×2304), badge `JV`, y el resume rediseñado navy/teal ya existen y están listos para integrarse como favicon, `og:image` y hero del sitio.

## 3. Estrategia de branding

### 3.1 Sistema visual `jv_`
- **Formalizar el sistema `jv_`**: el logo mark, la paleta ya definida en `src/styles/variables.js`, tipografía mono para acentos (`>`, `_`, comentarios `//`) como firma visual transversal — favicon, `og:image`, loader de carga, botones, resume, portafolio.
- **Actualizar metadatos del repo**: README propio (dando crédito a Brittany Chiang / v4 en una línea, sin exhibir su contenido como propio), manifest (`gatsby-plugin-manifest`), favicons, `og.png`.

### 3.2 Posicionamiento: "de la idea a la realidad"
Tres conceptos definen el mensaje de marca y, entre ellos, cubren dos audiencias distintas que hoy llegan al mismo sitio sin distinción:

- **"De la idea a la realidad"** — la promesa central, no una etiqueta de servicio. Funciona como headline del hero y como hilo narrativo del sitio completo (idea → prototipo → producto), no como frase suelta.
- **"CTO para tus proyectos"** — ángulo para negocios con tracción que necesitan liderazgo técnico sin contratar un CTO de tiempo completo. La prueba son Adopta+, IASA y Ubiqua (liderazgo técnico/producto para terceros).
- **"Builder para tus ideas"** — ángulo para alguien que solo tiene una idea y necesita construirla de cero, más manos a la obra que asesoría. La prueba son Propers, Havli y Colabores (0 a 1, como fundador).

**Decisión pendiente antes de escribir el copy final**: si jvillar.dev sigue siendo principalmente un portafolio para conseguir empleo full-time, o si pasa a ser también una landing de servicios para captar clientes de CTO fraccional / builder. Si es lo segundo, el sitio necesita audiencias separadas desde el hero — por ejemplo dos CTA en vez de uno: "Trabajemos juntos" (founders) y "Ver experiencia" (reclutadores) — y una sección nueva tipo "Cómo trabajo" con el proceso idea → prototipo → producto.

**Riesgo de copy a vigilar**: "CTO para tus proyectos" puede sonar a que ya existe un historial de clientes externos de CTO fraccional, cuando la trayectoria de Jaime como CTO/founder ha sido para sus propias empresas o como empleado. Redactar en tono de disponibilidad ("Ayudo a fundadores a convertir su idea en producto") en vez de historial ("He sido CTO fraccional de N empresas") hasta que existan casos reales de ese tipo de engagement.

### 3.3 Voz de marca
"Integrator of technologies" (ya está en el resume), builder/founder pragmático, LATAM-first, bilingüe — ahora con un giro más de confianza hacia "socio técnico que ejecuta", consistente con el posicionamiento de 3.2.

## 4. Expansión del portafolio

### 4.1 Nuevos proyectos como fundador
- **Havli App** — "Sistema operativo del hogar": app que centraliza gestión familiar, mascotas, vivienda, vehículos, tareas, documentos, finanzas y mantenimiento, usando IA para automatizar procesos. Rol: cofundador. Va como entrada `featured` + `jobs` (Founder).
- **Colabores** — plataforma de colaboración/servicios que conecta personas y negocios para colaborar en proyectos y servicios (similar en espíritu a Propers). Va como entrada `featured` + `jobs` (Founder).

**Pendiente de ti** antes de redactar las fichas finales: rol exacto, stack técnico, estado (MVP/beta/producción), y link o capturas de Colabores; lo mismo para Havli si quieres afinar el copy más allá del resumen de tus notas de cofundador.

Si se adopta el posicionamiento de 3.2, Havli y Colabores conviene presentarlos como **casos de estudio** (problema → rol → stack → resultado) en vez de tarjetas de proyecto estándar — son la evidencia directa del ángulo "builder para tus ideas".

### 4.2 Limpieza y sincronización
- Eliminar o archivar los 13 proyectos de plantilla identificados en 2.2.
- Auditar el resto de `content/projects/` (agencia/freelance real vs. demos de Brittany) y decidir qué se conserva.
- Sincronizar `content/jobs/` con el resume 2026: agregar InTech Ideas y corregir fechas de IASA; decidir si se incluyen los roles más antiguos (Nueraly, Good Citizen, SAI) o se resumen para no saturar la sección.
- Reemplazar `static/resume.pdf` con la versión rediseñada ya entregada.

## 5. Rediseño visual (vía `/design`)

Se generarán **2-3 direcciones visuales alternativas** partiendo del sistema `jv_`, conservando la estructura de información que ya funciona (hero, about, jobs, projects, contact) pero refrescando composición, imaginería y micro-interacciones. Ver propuestas en la sección siguiente de esta conversación.

Áreas de foco:
- Nuevo hero integrando el logo `jv_` y el header banner ya generado, con "De la idea a la realidad" como headline y una línea tipo terminal que alterna (efecto de tipeo) entre `// CTO para tus proyectos` y `// Builder para tus ideas` — encaja de forma natural con la dirección "A · Terminal".
- Dos CTA distintos en el hero si se adopta el posicionamiento de 3.2: "Trabajemos juntos" (founders) y "Ver experiencia" (reclutadores), en vez de un único CTA genérico.
- Nueva sección "Cómo trabajo": idea → prototipo → producto, como puente entre el hero y los proyectos.
- Sección "Founder Projects" con tratamiento visual diferenciado (cards destacadas, formato caso de estudio) para Havli/Colabores vs. trabajo de cliente/empleo.
- Unificar tarjetas de proyecto con el nuevo lenguaje visual (tags estilo terminal, bordes teal, motivo `>`/`_`).

## 6. Estrategia técnica y SEO

- **Migración de framework**: evaluar mover de Gatsby 3 a Gatsby 5, Next.js o Astro — Gatsby 3 es de 2021 y ya no recibe soporte activo. Esta decisión debería tomarse antes de invertir mucho en el rediseño visual, para no rehacer trabajo.
- **Internacionalización ES/EN** ("LATAM-first", consistente con tus notas de Havli): rutas `/es` y `/en`, contenido duplicado por proyecto y trabajo, selector de idioma en el nav.
- **Posicionamiento ante crawlers de IA**: agregar `llms.txt`, datos estructurados (`schema.org` Person/CreativeWork), y asegurar que el contenido clave esté en texto plano indexable (no solo en imágenes) — conecta con tu nota "posicionamiento-web-ai-crawlers-cloudflare".
- **Performance**: ya se usa `gatsby-plugin-image`; correr Lighthouse tras el rediseño y antes de una eventual migración de framework para tener una línea base.

## 7. Roadmap por fases

1. **Fase 0 — Auditoría y limpieza de contenido** (≈1 semana): remover proyectos de plantilla, reescribir README, sincronizar `content/jobs/` con el resume 2026.
2. **Fase 1 — Sistema de marca y posicionamiento** (≈1 semana): integrar favicon, `og:image`, resume rediseñado y demás activos `jv_` ya generados; decidir el alcance de audiencia (3.2) y fijar el copy final del hero.
3. **Fase 2 — Direcciones de diseño** (≈1-2 semanas): revisar las 2-3 propuestas de `/design`, elegir una, prototipar componentes clave.
4. **Fase 3 — Expansión de portafolio** (≈1-2 semanas): redactar y publicar fichas de Havli y Colabores, depurar el resto de proyectos.
5. **Fase 4 — Internacionalización** (≈2-3 semanas): estructura ES/EN, traducción de contenido.
6. **Fase 5 — Endurecimiento técnico y SEO** (≈1 semana): `llms.txt`, datos estructurados, decisión final sobre migración de framework, auditoría de performance.
7. **Fase 6 — Lanzamiento y medición**: deploy, Search Console, analítica de contacto/descargas de CV.

## 8. Métricas de éxito

- 0 proyectos de plantilla sin atribuir visibles en producción.
- Havli y Colabores visibles como featured projects.
- Resume y `og:image` alineados al 100% con el sistema `jv_`.
- Sitio bilingüe funcional con `hreflang` correcto.
- Lighthouse Performance/SEO > 90 tras el rediseño.

## 9. Próximos pasos inmediatos

- Decidir el alcance de audiencia del sitio (3.2): ¿solo portafolio de empleo, o también landing de servicios CTO/builder?
- Confirmar detalles finales de Colabores (rol, stack, link, estado) para redactar su ficha.
- Revisar y aprobar una de las direcciones de `/design` para iniciar la Fase 2.
- Decidir si se conserva Gatsby o se migra de framework antes de invertir en el rediseño visual.
