import { CartItem } from '@/data'
import { translations } from '@/lib/i18n/translations'

interface OrderEmailData {
  id: string
  customerName: string
  items: CartItem[]
  total: number
  deposit: number
  pickupDate: string
}

type Locale = 'fr' | 'nl' | 'en'

export function generateOrderConfirmationEmail(order: OrderEmailData, locale: Locale = 'fr'): string {
  const e = translations[locale].email as Record<string, string>
  const firstName = order.customerName.split(' ')[0]
  const pickupDay = order.pickupDate === 'vendredi' ? e.pickupFriday : e.pickupSaturday

  const productRows = order.items.map(item => `
    <tr style="border-top:1px solid #eee;">
      <td style="padding:16px 20px;font-size:15px;color:#333;">${item.name}</td>
      <td style="padding:16px 20px;font-size:15px;color:#333;text-align:center;">${item.quantity}</td>
      <td style="padding:16px 20px;font-size:15px;color:#333;text-align:right;">${(item.price * item.quantity).toFixed(2)} €</td>
    </tr>
  `).join('')

  const greeting = e.greeting.replace('{firstName}', firstName)

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e.confirmed}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:'Georgia',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background-color:#2d5a27;padding:48px 40px 36px;text-align:center;border-radius:12px 12px 0 0;">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:#a8d5a2;">${e.confirmed}</p>
            <h1 style="margin:0;font-size:32px;color:#ffffff;font-weight:normal;letter-spacing:1px;">🌿 La Ferme des Hirondelles</h1>
            <p style="margin:16px 0 0;font-size:14px;color:#c8e6c4;font-style:italic;">${e.thanks}</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#ffffff;padding:48px 40px;">
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#2d5a27;">#${order.id}</p>
            <h2 style="margin:0 0 24px;font-size:26px;color:#1a1a1a;font-weight:normal;">${greeting}</h2>
            <p style="margin:0 0 28px;font-size:16px;color:#555;line-height:1.7;">${e.body}</p>

            <p style="margin:0 0 12px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#2d5a27;">${e.summary}</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;margin-bottom:28px;">
              <tr style="background-color:#f5f0e8;">
                <td style="padding:12px 20px;font-size:13px;color:#888;letter-spacing:1px;text-transform:uppercase;">${e.colProduct}</td>
                <td style="padding:12px 20px;font-size:13px;color:#888;letter-spacing:1px;text-transform:uppercase;text-align:center;">${e.colQty}</td>
                <td style="padding:12px 20px;font-size:13px;color:#888;letter-spacing:1px;text-transform:uppercase;text-align:right;">${e.colPrice}</td>
              </tr>
              ${productRows}
              <tr style="background-color:#2d5a27;">
                <td colspan="2" style="padding:16px 20px;font-size:16px;color:#ffffff;font-weight:bold;">${e.total}</td>
                <td style="padding:16px 20px;font-size:16px;color:#ffffff;font-weight:bold;text-align:right;">${order.total.toFixed(2)} €</td>
              </tr>
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;border-radius:8px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px 28px;">
                  <p style="margin:0 0 12px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#2d5a27;">${e.pickupTitle}</p>
                  <p style="margin:0 0 4px;font-size:15px;color:#333;">📍 Ferme des Hirondelles, 33 rue du Moulin, 1950 Kraainem</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#666;">🗓️ ${e.pickupLabel} <strong>${pickupDay}</strong></p>
                  <p style="margin:0;font-size:14px;color:#2d5a27;">💳 ${e.depositLabel} <strong>${order.deposit.toFixed(2)} €</strong></p>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:14px;color:#999;line-height:1.6;border-top:1px solid #eee;padding-top:24px;">
              ${e.question}
              <a href="mailto:cedricfeyants@cedstudiolab.com" style="color:#2d5a27;">cedricfeyants@cedstudiolab.com</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#2d5a27;padding:28px 40px;text-align:center;border-radius:0 0 12px 12px;">
            <p style="margin:0 0 6px;font-size:13px;color:#a8d5a2;">🌿 La Ferme des Hirondelles</p>
            <p style="margin:0;font-size:12px;color:#6aab64;">cedstudiolab.com · cedricfeyants@cedstudiolab.com</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
