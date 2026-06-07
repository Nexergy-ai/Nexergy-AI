# UI Cleanup Plan - Nexergy-AI

Este documento detalla la estrategia para refactorizar la interfaz de Nexergy-AI hacia un estándar empresarial minimalista, eliminando el "vibe coding" y la sobrecarga visual.

## 1. Diagnóstico de Ruido Visual Identificado

Tras la auditoría inicial, se han detectado los siguientes elementos que generan fatiga visual y falta de cohesión:

- **Sombras y Brillos Excesivos:** Uso de `hover:shadow-[0_0_30px_rgba(...)]` y sombras internas pesadas en componentes como `Hero` e `IntelligenceLayers`.
- **Bordes Neon Inconsistentes:** Uso de `border-2` con colores vibrantes en casi todos los contenedores, lo que rompe la jerarquía visual.
- **Fondos "Mágicos":** Repetición de valores arbitrarios como `bg-[rgba(20,30,60,0.5)]` en lugar de utilizar el sistema de colores de Tailwind o variables CSS.
- **Elementos Decorativos Redundantes:** Círculos de fondo con `blur-3xl` que, aunque estéticos, se repiten en cada sección sin un propósito funcional claro.
- **Densidad de Clases:** Componentes con listas de clases de Tailwind extremadamente largas que dificultan el mantenimiento.

## 2. Estrategia de Simplificación

### A. Espacio Negativo y Bordes
- **Acción:** Reemplazar bordes de 2px de colores neón por bordes de 1px sutiles (`border-border` o `border-white/10`).
- **Objetivo:** Utilizar el espacio en blanco (o vacío) para separar secciones en lugar de líneas gruesas de colores.

### B. Normalización de Sombras y Elevación
- **Acción:** Eliminar sombras personalizadas con colores neón. Utilizar sombras estándar de Tailwind (`shadow-sm`, `shadow-md`) solo donde sea estrictamente necesario para indicar elevación.
- **Objetivo:** Eliminar el efecto "glow" que distrae de la información operativa.

### C. Consolidación de Componentes
- **Acción:** Agrupar tarjetas pequeñas en secciones con grids más limpios. Unificar el padding interno a una escala consistente (ej. `p-6` para contenedores principales, `p-4` para secundarios).
- **Objetivo:** Reducir la fragmentación visual del dashboard.

### D. Refactorización de Código
- **Acción:** Extraer patrones de clases repetitivos. Por ejemplo, crear una constante para el estilo de "Enterprise Card" en lugar de repetir 15 clases en cada archivo.

## 3. Plan de Acción por Componente

| Componente | Cambios Específicos |
| :--- | :--- |
| **Hero.tsx** | Eliminar `hover:shadow-[0_0_30px_...]`. Simplificar botones a estados sólidos/outline sin brillos. |
| **IntelligenceLayers.tsx** | Quitar `boxShadow` y `borderColor` dinámicos pesados. Usar bordes finos y un sutil cambio de fondo en hover. |
| **TrustGovernance.tsx** | Reducir el grosor del borde de `border-2` a `border`. Normalizar fondos de tarjetas. |
| **OperationalDashboard.tsx** | Eliminar círculos decorativos de fondo. Unificar el estilo de las tarjetas de métricas. |
| **Navigation.tsx** | Limpiar el efecto de desenfoque y bordes del header para un look más "flat" y profesional. |

## 4. Verificación de Performance
- Se eliminarán múltiples capas de `backdrop-blur` y filtros de `blur-3xl` que impactan el rendimiento del renderizado en dispositivos menos potentes.
- El DOM será más ligero al eliminar elementos decorativos `div` vacíos utilizados solo para efectos de luz.

---
**Solicitud de Confirmación:** Por favor, revisa este plan. Una vez confirmado, procederé con la implementación en la rama `ui/cleanup-v3`.
