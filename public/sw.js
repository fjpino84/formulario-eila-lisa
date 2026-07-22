self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Gánale a LISA", body: event.data.text() };
  }

  const url = payload.milestone ? "/admin?celebrate=100" : "/admin";

  event.waitUntil(
    self.registration.showNotification(payload.title || "Gánale a LISA", {
      body: payload.body || "",
      icon: "/logo.png",
      badge: "/logo.png",
      data: { url },
      requireInteraction: Boolean(payload.milestone),
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/admin";
  event.waitUntil(clients.openWindow(url));
});
