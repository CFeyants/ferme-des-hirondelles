import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ConstructionBanner } from '@/components/layout/ConstructionBanner'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { translations } from '@/lib/i18n/translations'

const DESCRIPTIONS: Record<string, string> = {
  fr: 'Produits fermiers frais en circuit court — Click & Collect à Crainhem',
  nl: 'Verse boerderijproducten in korte keten — Click & Collect in Kraainem',
  en: 'Fresh farm products in short supply chain — Click & Collect in Kraainem',
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value ?? 'fr'
  const safeLocale = ['fr', 'nl', 'en'].includes(locale) ? locale : 'fr'
  return {
    title: 'Ferme des Hirondelles',
    description: DESCRIPTIONS[safeLocale],
  }
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
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
