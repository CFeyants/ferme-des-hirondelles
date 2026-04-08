'use client'

import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

function getNextThursdayDeadline(): Date {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  const target = new Date(now)

  // Days until next Thursday (4)
  let daysUntilThursday = (4 - day + 7) % 7
  if (daysUntilThursday === 0 && (now.getHours() > 23 || (now.getHours() === 23 && now.getMinutes() >= 59))) {
    daysUntilThursday = 7
  }

  target.setDate(target.getDate() + daysUntilThursday)
  target.setHours(23, 59, 59, 0)
  return target
}

function isClosed(): boolean {
  const day = new Date().getDay()
  return day === 5 || day === 6
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function OrderCountdown() {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null)
  const [closed, setClosed] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const update = () => {
      if (isClosed()) {
        setClosed(true)
        return
      }
      setClosed(false)
      const now = new Date()
      const deadline = getNextThursdayDeadline()
      const diff = Math.max(0, deadline.getTime() - now.getTime())
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ d, h, m, s })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeLeft && !closed) return null

  if (closed) {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-xl px-6 py-4 flex items-center gap-3 justify-center">
        <Clock className="h-5 w-5 text-red-500 shrink-0" />
        <span className="font-semibold text-red-700">{t('countdown.closed')}</span>
        <span className="text-red-600 text-sm">{t('countdown.reopens')}</span>
      </div>
    )
  }

  const totalSeconds = (timeLeft!.d * 86400) + (timeLeft!.h * 3600) + (timeLeft!.m * 60) + timeLeft!.s
  const color = totalSeconds > 86400
    ? { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-600', label: 'text-green-700' }
    : totalSeconds > 21600
    ? { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-500', label: 'text-orange-700' }
    : { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-600', label: 'text-red-700' }

  return (
    <div className={`w-full ${color.bg} border ${color.border} rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center gap-3 justify-center`}>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color.badge} animate-pulse`} />
        <span className={`font-semibold ${color.label}`}>{t('countdown.open')}</span>
      </div>
      <div className={`flex items-center gap-1 font-mono font-bold text-lg ${color.text}`}>
        {timeLeft!.d > 0 && <span>{timeLeft!.d}{t('countdown.days')} </span>}
        <span>{pad(timeLeft!.h)}</span>
        <span className="opacity-60">:</span>
        <span>{pad(timeLeft!.m)}</span>
        <span className="opacity-60">:</span>
        <span>{pad(timeLeft!.s)}</span>
      </div>
      <span className={`text-sm ${color.label}`}>{t('countdown.before')}</span>
    </div>
  )
}
