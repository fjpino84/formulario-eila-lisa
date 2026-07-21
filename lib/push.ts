import webpush from "web-push";
import { getDb, ensureSchema, PushSubscriptionRow } from "@/lib/db";

let configured = false;

function configure() {
  if (configured) return;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return;

  webpush.setVapidDetails("mailto:fjpino@gmail.com", publicKey, privateKey);
  configured = true;
}

export async function saveSubscription(sub: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO push_subscriptions (endpoint, p256dh, auth)
          VALUES (?, ?, ?)
          ON CONFLICT(endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth`,
    args: [sub.endpoint, sub.keys.p256dh, sub.keys.auth],
  });
}

export async function sendPushToAll(payload: {
  title: string;
  body: string;
}): Promise<void> {
  configure();
  if (!configured) return;

  await ensureSchema();
  const db = getDb();
  const result = await db.execute("SELECT * FROM push_subscriptions");
  const rows = result.rows as unknown as PushSubscriptionRow[];

  await Promise.all(
    rows.map(async (row) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: row.endpoint,
            keys: { p256dh: row.p256dh, auth: row.auth },
          },
          JSON.stringify(payload)
        );
      } catch (error) {
        const statusCode = (error as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await db.execute({
            sql: "DELETE FROM push_subscriptions WHERE endpoint = ?",
            args: [row.endpoint],
          });
        } else {
          console.error("Push send failed:", error);
        }
      }
    })
  );
}
