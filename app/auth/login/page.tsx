'use client'

import React, { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
type LoginFormData = z.infer<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/boutique'
  const { t } = useLanguage()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
      if (error) throw new Error(t('auth.login.error'))
      router.replace(from)
    } catch (err: any) {
      setError(err.message || t('common.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminReset = async () => {
    if (!confirm("Réinitialiser les mots de passe admins à '123456' ?")) return
    setIsResetting(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/make-server-eb0bde5e/admin/reset-password`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' }
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success("Mots de passe réinitialisés à '123456'")
    } catch (err: any) {
      toast.error(`Erreur: ${err.message}`)
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-serif font-bold text-center">{t('auth.login.title')}</CardTitle>
        <CardDescription className="text-center">{t('auth.login.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200"><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.login.email')}</Label>
            <Input id="email" type="email" placeholder="nom@exemple.com" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('auth.login.password')}</Label>
              <Link href="/auth/forgot-password" className="text-xs text-stone-500 hover:text-green-600 hover:underline">{t('auth.login.forgotPassword')}</Link>
            </div>
            <Input id="password" type="password" {...register('password')} className={errors.password ? 'border-red-500' : ''} />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t('auth.login.submit')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm text-stone-500">
        <div>{t('auth.login.noAccount')}{' '}<Link href="/auth/register" className="text-green-600 font-medium hover:underline">{t('auth.login.createAccount')}</Link></div>
        <div className="w-full pt-4 border-t mt-4">
          <Button variant="outline" className="w-full text-xs text-stone-400 border-dashed" onClick={handleAdminReset} disabled={isResetting}>
            {isResetting ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <ShieldAlert className="mr-2 h-3 w-3" />}
            Réinitialiser Admin (Urgence)
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <Suspense fallback={<div className="w-full max-w-md h-64 animate-pulse bg-stone-100 rounded-lg" />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
