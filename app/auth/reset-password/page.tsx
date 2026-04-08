'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle } from 'lucide-react'

const schema = z.object({
  password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { path: ['confirmPassword'] })

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setIsReady(true)
    }
    checkSession()
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: data.password })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2000)
    } catch (err: any) {
      setError(err.message || t('common.error'))
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-serif font-bold">{t('auth.resetPassword.success')}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600 mb-4" />
            <CardTitle>{t('common.loading')}</CardTitle>
            <CardDescription>
              <Link href="/auth/forgot-password" className="text-green-600 hover:underline">{t('auth.forgotPassword.submit')}</Link>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif font-bold text-center">{t('auth.resetPassword.title')}</CardTitle>
          <CardDescription className="text-center">{t('auth.resetPassword.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200"><AlertDescription>{error}</AlertDescription></Alert>}
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.resetPassword.password')}</Label>
              <Input id="password" type="password" {...register('password')} className={errors.password ? 'border-red-500' : ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('auth.resetPassword.confirmPassword')}</Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} className={errors.confirmPassword ? 'border-red-500' : ''} />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} {t('auth.resetPassword.submit')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/auth/login" className="text-sm text-stone-500 hover:text-stone-900">{t('auth.forgotPassword.back')}</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
