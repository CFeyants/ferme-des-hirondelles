import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, html, text } = body

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json({ error: 'Missing required fields: to, subject, html/text' }, { status: 400 })
    }

    await transporter.sendMail({
      from: `"Ferme des Hirondelles" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: err.message || 'Failed to send email' }, { status: 500 })
  }
}
