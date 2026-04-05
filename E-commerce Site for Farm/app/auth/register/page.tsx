'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/src/app/components/ui/button'
import { Input } from '@/src/app/components/ui/input'
import { Label } from '@/src/app/components/ui/label'
import { Checkbox } from '@/src/app/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/app/components/ui/card'
import { Alert, AlertDescription } from '@/src/app/components/ui/alert'
import { Loader2, Check } from 'lucide-react'

const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom est requis' }),
  lastName: z.string().min(2, { message: 'Le nom est requis' }),
  address: z.string().min(5, { message: "L'adresse est requise" }),
  phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: 'Vous devez accepter les CGV' }),
}).refine(d => d.password === d.confirmPassword, { message: 'Les mots de passe ne correspondent pas', path: ['confirmPassword'] })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { acceptTerms: false }
  })

  const password = watch('password', '')
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { first_name: data.firstName, last_name: data.lastName, address: data.address, phone: data.phone }
        }
      })
      if (authError) throw authError
      if (authData.user?.identities?.length === 0) throw new Error('Cet email est déjà utilisé.')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription.")
    } finally {
      setIsLoading(false)
    }
  }

  const Req = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center text-xs ${met ? 'text-green-600' : 'text-stone-400'}`}>
      {met ? <Check className="h-3 w-3 mr-1" /> : <div className="h-3 w-3 mr-1 rounded-full border border-stone-300" />}
      {text}
    </div>
  )

  if (success) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-serif font-bold">Compte créé avec succès !</CardTitle>
            <CardDescription>Un email de confirmation a été envoyé. Cliquez sur le lien pour activer votre compte.</CardDescription>
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
          <CardTitle className="text-2xl font-serif font-bold text-center">Créer un compte</CardTitle>
          <CardDescription className="text-center">Rejoignez la Ferme des Hirondelles pour commander vos produits frais</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200"><AlertDescription>{error}</AlertDescription></Alert>}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Jean" {...register('firstName')} className={errors.firstName ? 'border-red-500' : ''} />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Dupont" {...register('lastName')} className={errors.lastName ? 'border-red-500' : ''} />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse complète</Label>
              <Input id="address" placeholder="10 rue de la Ferme, 1000 Bruxelles" {...register('address')} className={errors.address ? 'border-red-500' : ''} />
              {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" type="tel" placeholder="0470 12 34 56" {...register('phone')} className={errors.phone ? 'border-red-500' : ''} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nom@exemple.com" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" {...register('password')} className={errors.password ? 'border-red-500' : ''} />
              <div className="grid grid-cols-2 gap-1 mt-2">
                <Req met={hasMinLength} text="8 caractères min." />
                <Req met={hasUpperCase} text="1 majuscule" />
                <Req met={hasLowerCase} text="1 minuscule" />
                <Req met={hasNumber} text="1 chiffre" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" {...register('confirmPassword')} className={errors.confirmPassword ? 'border-red-500' : ''} />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-start space-x-3 pt-4 border-t">
              <Checkbox id="acceptTerms" className="mt-0.5" onCheckedChange={(checked) => setValue('acceptTerms', checked as boolean)} />
              <div className="space-y-1">
                <Label htmlFor="acceptTerms" className="text-sm text-stone-600 font-normal leading-snug cursor-pointer">
                  J'accepte les <Link href="/cgv" target="_blank" className="text-green-600 font-medium hover:underline">CGV</Link> et la <Link href="/confidentialite" className="text-green-600 font-medium hover:underline">Politique de Confidentialité</Link>.
                </Label>
                {errors.acceptTerms && <p className="text-xs text-red-500 font-medium">{errors.acceptTerms.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Créer mon compte
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-stone-500">
          Déjà un compte ?{' '}<Link href="/auth/login" className="text-green-600 font-medium hover:underline ml-1">Se connecter</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
