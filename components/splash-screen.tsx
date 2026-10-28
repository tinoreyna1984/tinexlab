"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { splashStorageKey } from "@/lib/splash";

// Duraciones en ms. DEBEN coincidir con las animaciones
// `splash-fade-in` / `splash-fade-out` (0.3s) de app/globals.css.
const fadeMs = 300;
// Progreso simulado: techo de 90 % en loadTargetMs con curva ease-out
// (rápido al inicio, lento cerca del techo). El 100 % solo llega con `load`.
const loadTargetMs = 2500;
const progressCeiling = 90;
// Remate de 90 → 100 % cuando la página termina de cargar.
const finishMs = 300;
// Cierre garantizado: el splash debe quedar OCULTO antes de los 8 s desde
// su aparición (spec). El punto de referencia es performance.now() (tiempo
// desde el inicio de la navegación, ≈ aparición), no el montaje del
// componente, porque la hidratación puede llegar tarde: se deja margen para
// el rampado a 100 % y el fade-out completos.
const hardStopAt = 8000 - finishMs - fadeMs - 300;

type Phase = "oculto" | "apareciendo" | "cargando" | "desapareciendo";

// Degradación defensiva (D7): si sessionStorage no está disponible (p. ej.
// modo privado estricto), la bandera vive solo en memoria y el splash se
// muestra una vez por carga de página sin romper la app.
let memorySeen = false;

function readSeen(): boolean {
  if (memorySeen) return true;
  try {
    return window.sessionStorage.getItem(splashStorageKey) !== null;
  } catch {
    return false;
  }
}

function writeSeen(): void {
  memorySeen = true;
  try {
    window.sessionStorage.setItem(splashStorageKey, "1");
  } catch {
    // Sin sessionStorage: la memoria de este módulo cubre esta carga.
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// useLayoutEffect no hace nada en el servidor; el puntero evita su aviso de
// SSR y se resuelve en el cliente (guía "Preventing Flash" de Next 16).
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SplashScreen() {
  // Estado inicial idéntico al SSR (splash visible en 0 %) para que la
  // hidratación concuerde; toda decisión post-mount ocurre en efectos (D3).
  const [phase, setPhase] = useState<Phase>("apareciendo");
  const [progress, setProgress] = useState(0);

  const decidedRef = useRef(false);
  const shouldShowRef = useRef(true);
  const finishedRef = useRef(false);
  const progressRef = useRef(0);
  const hardStopRef = useRef<number | undefined>(undefined);
  const finishRafRef = useRef<number | undefined>(undefined);

  // Remate: lleva el porcentaje a 100 % (breve rampa) y encadena el
  // fade-out. Idempotente: solo cuenta la primera llamada.
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const from = progressRef.current;
    const duration = prefersReducedMotion() ? 0 : finishMs;
    if (duration === 0) {
      progressRef.current = 100;
      setProgress(100);
      setPhase("desapareciendo");
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const value = Math.round(from + (100 - from) * t);
      progressRef.current = value;
      setProgress(value);
      if (t < 1) {
        finishRafRef.current = requestAnimationFrame(step);
      } else {
        setPhase("desapareciendo");
      }
    };
    finishRafRef.current = requestAnimationFrame(step);
  }, []);

  // Decisión de mostrar/ocultar, antes del primer pintado. Solo se decide
  // una vez por instancia: en dev, Strict Mode re-ejecuta los efectos y la
  // bandera recién escrita no debe ocultar el splash de esta carga.
  useIsomorphicLayoutEffect(() => {
    if (!decidedRef.current) {
      decidedRef.current = true;
      shouldShowRef.current = !readSeen();
      if (shouldShowRef.current) writeSeen();
    }

    if (!shouldShowRef.current) {
      // Visita repetida: el script inline ya lo ocultó pre-paint; aquí se
      // re-aplica por si Strict Mode limpió el atributo de <html> (guía
      // "Preventing Flash" de Next 16; no-op en producción).
      document.documentElement.setAttribute("data-splash", "seen");
      setPhase("oculto");
      return;
    }

    // Cierre garantizado: no depende de la señal `load` para desaparecer.
    // Restante hasta el tope absoluto en tiempo de navegación.
    const remaining = Math.max(0, hardStopAt - performance.now());
    hardStopRef.current = window.setTimeout(finish, remaining);
    return () => {
      window.clearTimeout(hardStopRef.current);
    };
  }, [finish]);

  // Transiciones de fases. Con `prefers-reduced-motion` las esperas son 0:
  // aparecer y desaparecer son inmediatos, sin transición de opacidad
  // (el CSS además desactiva las animaciones con `animation: none`).
  useEffect(() => {
    if (phase === "apareciendo") {
      // Si ya hubo remate, el rampado lleva directo a desapareciendo.
      if (finishedRef.current) return;
      const delay = prefersReducedMotion() ? 0 : fadeMs;
      const timer = window.setTimeout(() => setPhase("cargando"), delay);
      return () => window.clearTimeout(timer);
    }
    if (phase === "desapareciendo") {
      const delay = prefersReducedMotion() ? 0 : fadeMs;
      const timer = window.setTimeout(() => setPhase("oculto"), delay);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  // Progreso simulado mientras la página carga: ease-out hacia el techo de
  // 90 %, siempre creciente, sin retrasar ni bloquear la carga real.
  useEffect(() => {
    if (phase !== "cargando") return;

    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      if (finishedRef.current) return;
      const t = Math.min(1, (now - start) / loadTargetMs);
      const value = Math.round(progressCeiling * (1 - (1 - t) ** 3));
      progressRef.current = Math.max(progressRef.current, value);
      setProgress(progressRef.current);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onLoad = () => finish();
    window.addEventListener("load", onLoad);
    // Si `load` ya se disparó antes de llegar aquí, no se pierde la señal
    // (programada como callback para no encadenar renders desde el cuerpo
    // del efecto).
    if (document.readyState === "complete") window.setTimeout(finish, 0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [phase, finish]);

  // Limpieza del rampado de remate al desmontar.
  useEffect(() => {
    return () => {
      if (finishRafRef.current) cancelAnimationFrame(finishRafRef.current);
    };
  }, []);

  if (phase === "oculto") return null;

  return (
    <div
      data-testid="splash-screen"
      className={`splash splash--${phase}`}
      // Capa decorativa: no tiene elementos enfocables ni roba el foco.
      aria-hidden="true"
    >
      <Image
        src="/inicio.png"
        alt=""
        width={1180}
        height={884}
        priority
        className="splash__image"
      />
      <span data-testid="splash-progress" className="splash__progress">
        {progress} %
      </span>
    </div>
  );
}
