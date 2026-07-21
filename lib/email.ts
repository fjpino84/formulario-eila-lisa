import { Resend } from "resend";

const ADMIN_EMAIL = "francisco@lisainsurtech.com";
const FROM_ADMIN = "LISA Insurtech <notificaciones@ganalealisa.lat>";
const FROM_PARTICIPANT = "LISA Insurtech <no-reply@ganalealisa.lat>";

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendAdminNotification(subject: string, html: string): Promise<void> {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM_ADMIN,
    to: ADMIN_EMAIL,
    subject,
    html,
  });
}

export async function sendParticipantConfirmation(to: string, fullName: string): Promise<void> {
  const client = getClient();
  if (!client) return;

  await client.emails.send({
    from: FROM_PARTICIPANT,
    to,
    subject: "Muchas gracias por Participar — EILA 2026",
    html: participantConfirmationHtml(fullName),
  });
}

function participantConfirmationHtml(fullName: string): string {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color: #1f2937;">
    <div style="text-align: center; padding: 32px 16px 8px;">
      <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 16px; background: #0d9488; color: #fff; font-size: 28px; line-height: 56px;">✓</div>
      <h1 style="color: #115e59; font-size: 28px; margin: 16px 0 8px;">Muchas gracias por Participar</h1>
      <p style="color: #4b5563; max-width: 480px; margin: 0 auto;">
        Hola ${escapeHtml(fullName)}, haz detectado el Fraude <strong style="color:#6d28d9;">VISIBLE</strong>,
        pero ¿sabías que este documento esconde más cosas?
      </p>
    </div>

    <table role="presentation" width="100%" style="margin-top: 24px; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; padding: 8px; vertical-align: top;">
          <div style="border-left: 4px solid #0d9488; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <p style="font-size: 11px; font-weight: 700; letter-spacing: .05em; color: #0f766e; text-transform: uppercase; margin: 0 0 8px;">Critical Metadata</p>
            <h3 style="margin: 0 0 8px; color: #111827;">METADATA</h3>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              El rastro digital no miente. El archivo fue originalmente <b>creado en 2021</b>,
              pero detectamos ediciones fraudulentas realizadas en <b>Canva en 2024</b> para alterar su validez.
            </p>
          </div>
        </td>
        <td style="width: 50%; padding: 8px; vertical-align: top;">
          <div style="border-left: 4px solid #7e22ce; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 8px; color: #111827;">AGENTE SII</h3>
            <p style="font-size: 14px; color: #4b5563; margin: 0 0 8px;">
              Inconsistencia fiscal detectada. El monto real registrado es de <b>$108,000</b>,
              mientras que el documento presentado declara <b>$905,000</b>.
            </p>
            <p style="font-size: 13px; color: #6d28d9; font-weight: 600; margin: 0;">Discrepancia: +738%</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 8px; vertical-align: top;">
          <div style="background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 8px; color: #111827;">DESVIACIÓN</h3>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              Análisis estadístico muestra una <b>alta desviación</b> del promedio histórico de
              <b>$50,000</b> para este tipo de siniestro.
            </p>
          </div>
        </td>
        <td style="width: 50%; padding: 8px; vertical-align: top;">
          <div style="background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 8px; color: #111827;">COALICIÓN</h3>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              Patrón de comportamiento sospechoso: El beneficiario visitó al mismo proveedor
              <b>15 veces en solo 7 días</b>.
            </p>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 8px; vertical-align: top;">
          <div style="border-left: 4px solid #ef4444; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 8px; color: #111827;">WATCHLIST</h3>
            <p style="font-size: 14px; color: #4b5563; margin: 0;">
              Alerta roja de identidad. El RUT del beneficiario cuenta con
              <b>antecedentes previos de fraude</b> en nuestra base de datos global.
            </p>
          </div>
        </td>
      </tr>
    </table>

    <div style="margin-top: 24px; border-radius: 16px; padding: 32px; background: linear-gradient(135deg, #115e59, #0f766e, #6b21a8); color: #fff;">
      <h2 style="margin: 0 0 8px; font-size: 22px;">Hacemos <strong>visible</strong> el fraude invisible</h2>
      <p style="margin: 0 0 16px; color: #ccfbf1;">Nuestros tres pilares de detección de fraude son:</p>
      <table role="presentation" width="100%" style="border-collapse: collapse;">
        <tr>
          <td style="width: 33%; padding: 6px; vertical-align: top;">
            <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px;">
              <div style="font-size: 24px;">🔍</div>
              <p style="margin: 8px 0 0; font-weight: 600; font-size: 14px;">Análisis Forense Documental</p>
            </div>
          </td>
          <td style="width: 33%; padding: 6px; vertical-align: top;">
            <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px;">
              <div style="font-size: 24px;">🌐</div>
              <p style="margin: 8px 0 0; font-weight: 600; font-size: 14px;">Validación con Fuentes Externas</p>
            </div>
          </td>
          <td style="width: 33%; padding: 6px; vertical-align: top;">
            <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px;">
              <div style="font-size: 24px;">📊</div>
              <p style="margin: 8px 0 0; font-weight: 600; font-size: 14px;">Análisis de Patrones de Comportamiento</p>
            </div>
          </td>
        </tr>
      </table>
      <p style="text-align: center; margin: 24px 0 0; font-size: 14px; color: #ccfbf1;">
        ¿Quieres conocer más?
        <a href="https://www.lisainsurtech.com" style="color: #fff; font-weight: 600; text-decoration: underline;">haz click aquí</a>
      </p>
    </div>

    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin: 24px 0 32px;">
      LISA Insurtech · Creado por Francisco Pino
    </p>
  </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
