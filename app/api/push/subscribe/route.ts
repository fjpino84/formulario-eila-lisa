import { NextRequest, NextResponse } from "next/server";
import { saveSubscription } from "@/lib/push";

interface SubscribeBody {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<SubscribeBody>;

  if (!body.endpoint || !body.keys?.p256dh || !body.keys?.auth) {
    return NextResponse.json({ error: "Suscripción inválida" }, { status: 400 });
  }

  await saveSubscription({
    endpoint: body.endpoint,
    keys: { p256dh: body.keys.p256dh, auth: body.keys.auth },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
