'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const verified = searchParams.get('verified')
  const error = searchParams.get('error')

  // Still waiting — no param yet (shouldn't normally happen)
  if (!verified && !error) {
    return (
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-green-600 mb-4" />
          <CardTitle className="text-2xl font-serif font-bold">Vérification en cours...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (verified === 'true') {
    return (
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-serif font-bold">Email vérifié !</CardTitle>
          <CardDescription>Votre compte est activé. Vous pouvez maintenant vous connecter et passer vos premières commandes.</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/auth/login"><Button className="bg-green-600 hover:bg-green-700">Se connecter</Button></Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle className="text-2xl font-serif font-bold">Erreur de vérification</CardTitle>
        <CardDescription>Lien invalide ou expiré. Veuillez recréer un compte ou contacter le support.</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center gap-4">
        <Link href="/auth/register"><Button variant="outline">Créer un compte</Button></Link>
        <Link href="/auth/login"><Button className="bg-green-600 hover:bg-green-700">Se connecter</Button></Link>
      </CardFooter>
    </Card>
  )
}

export default function VerifyEmailPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <Suspense fallback={
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-green-600 mb-4" />
            <CardTitle className="text-2xl font-serif font-bold">Chargement...</CardTitle>
          </CardHeader>
        </Card>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  )
}
