/**
 * Clave única de la bandera de sesión del splash screen.
 *
 * Un solo origen de verdad: la lee el script inline pre-paint de
 * `app/layout.tsx` (Server Component) y `components/splash-screen.tsx`
 * (Client Component). Cambiarla aquí actualiza a ambos.
 */
export const splashStorageKey = "tinexlab-splash-seen";
