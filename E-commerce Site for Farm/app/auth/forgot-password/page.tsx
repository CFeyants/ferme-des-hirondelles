'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/src/app/components/ui/button'
import { Input } from '@/src/app/components/ui/input'
import { Label } from '@/src/app/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/app/components/ui/card'
import { Alert, AlertDescription } from '@/src/app/components/ui/alert'
import { Loader2, ArrowLeft, Mail } from 'lucide-react'

const schema = z.object({ email: z.string().email({ message: 'Adresse email invalide' }) })
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.')
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
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-serif font-bold">Email envoyé</CardTitle>
            <CardDescription>Si un compte existe avec cette adresse, vous recevrez un lien pour réinitialiser votre mot de passe.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link href="/auth/login"><Button variant="outline">Retour à la connexion</Button></Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif font-bold text-center">Mot de passe oublié</CardTitle>
          <CardDescription className="text-center">Entrez votre email pour recevoir un lien de réinitialisation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200"><AlertDescription>{error}</AlertDescription></Alert>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nom@exemple.com" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Envoyer le lien
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/auth/login" className="flex items-center text-sm text-stone-500 hover:text-stone-900">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
