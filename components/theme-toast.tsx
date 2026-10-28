"use client";

import { useEffect, useState } from "react";

import { storageKey, type ThemePreference } from "./theme-toggle";

export type ThemeToastLabels = {
  system: string;
  light: string;
  dark: string;
  dismiss: string;
};

type Phase = "oculto" | "apareciendo" | "visible" | "desapareciendo";

// Duraciones en ms. DEBEN coincidir con las animaciones
// `theme-toast-fade-in` / `theme-toast-fade-out` (0.3s) de app/globals.css.
const fadeMs = 300;
const visibleMs = 4000;

const nextPhase: Record<Exclude<Phase, "oculto">, Phase> = {
  apareciendo: "visible",
  visible: "desapareciendo",
  desapareciendo: "oculto",
};

function readPreference(): ThemePreference {
  const saved = window.localStorage.getItem(storageKey);
  return saved === "light" || saved === "dark" || saved === "system"
    ? saved
    : "system";
}

export function ThemeToast({ labels }: { labels: ThemeToastLabels }) {
  const [phase, setPhase] = useState<Phase>("oculto");
  const [preference, setPreference] = useState<ThemePreference>("system");
  // Identificador de cada aparición: reinicia los temporizadores aunque la
  // fase no cambie (p. ej. dos cambios de tema durante el fade-in).
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const show = () => {
      setPreference(readPreference());
      setRunId((id) => id + 1);
      setPhase("apareciendo");
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) show();
    };

    window.addEventListener("tinexlab-theme-change", show);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("tinexlab-theme-change", show);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (phase === "oculto") return;
    const timer = setTimeout(
      () => setPhase(nextPhase[phase]),
      phase === "visible" ? visibleMs : fadeMs,
    );
    return () => clearTimeout(timer);
  }, [phase, runId]);

  function close() {
    // Solo después de terminar de aparecer: durante el fade-in de entrada
    // el pulso no cierra el mensaje.
    if (phase === "visible") setPhase("desapareciendo");
  }

  return (
    <div role="status" aria-live="polite">
      {phase !== "oculto" && (
        <button
          type="button"
          data-testid="theme-toast"
          className={`theme-toast theme-toast--${phase}`}
          onClick={close}
        >
          <span>{labels[preference]}</span>
          <span className="sr-only"> {labels.dismiss}</span>
        </button>
      )}
    </div>
  );
}
