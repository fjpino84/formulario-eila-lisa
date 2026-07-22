"use client";

import { useEffect, useState } from "react";

type Status = "unsupported" | "checking" | "denied" | "subscribed" | "idle" | "needs-install";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

export default function PushNotificationsButton() {
  const [status, setStatus] = useState<Status>("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (isIos() && !isStandalone()) {
      setStatus("needs-install");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    navigator.serviceWorker.getRegistration().then(async (registration) => {
      const sub = await registration?.pushManager.getSubscription();
      setStatus(sub ? "subscribed" : "idle");
    });
  }, []);

  async function handleActivate() {
    setError(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        setError("Falta configurar la clave VAPID pública.");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      setStatus("subscribed");
    } catch {
      setError("No se pudo activar las notificaciones en este dispositivo.");
    }
  }

  if (status === "unsupported") return null;

  if (status === "needs-install") {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
        📲 En iPhone: toca <b>Compartir</b> → <b>Añadir a pantalla de inicio</b>, abre la app desde
        ahí, y vuelve a esta pantalla para activar las notificaciones.
      </div>
    );
  }

  if (status === "subscribed") {
    return (
      <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700">
        🔔 Notificaciones activadas
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleActivate}
        disabled={status === "checking"}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-60"
      >
        🔔 Activar notificaciones
      </button>
      {status === "denied" && (
        <span className="text-xs text-red-600">
          Bloqueadas en el navegador; habilítalas desde la configuración del sitio.
        </span>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
