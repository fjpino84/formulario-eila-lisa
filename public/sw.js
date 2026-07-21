self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "LISA Insurtech", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "LISA Insurtech", {
      body: payload.body || "",
      icon: "/logo.png",
      badge: "/logo.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/admin"));
});
