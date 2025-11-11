# Buscador de Trámites — Demo
Buscador client-side con sinónimos y accesibilidad básica (teclado, `aria-live`, resaltado).

## Cómo usar / editar
- Edita `DATA` en `index.html` para agregar trámites y alias (sinónimos).
- El buscador normaliza acentos y mayúsculas.
- Navegación con teclado:
  - Foco en el input → `↓` salta al primer resultado.
  - En resultados: `↑/↓` recorren; `Enter` abre en nueva pestaña.

## Accesibilidad
- `aria-live="polite"` en contenedor de resultados.
- Input con `label` y `aria-describedby`.
- Resaltado con `<mark>` (sin depender solo de color).
