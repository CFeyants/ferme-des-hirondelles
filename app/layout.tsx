import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ConstructionBanner } from '@/components/layout/ConstructionBanner'

export const metadata: Metadata = {
  title: 'Ferme des Hirondelles',
  description: 'Produits fermiers frais en circuit court — Click & Collect à Crainhem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
        <Providers>
          <ConstructionBanner />
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
