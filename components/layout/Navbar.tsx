'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, User, Tractor, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStore } from '@/context/StoreContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { Cart } from '@/components/shop/Cart'
import { isAdmin } from '@/utils/admin'
import { Locale } from '@/lib/i18n/translations'

export const Navbar = () => {
  const { cart } = useStore()
  const { user, signOut } = useAuth()
  const { locale, setLocale, t } = useLanguage()
  const router = useRouter()

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const isUserAdmin = isAdmin(user?.email)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-stone-50/80 backdrop-blur-md text-stone-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Tractor className="h-6 w-6 text-green-700" />
          <span className="font-serif text-xl font-bold tracking-tight text-green-900">
            Ferme des Hirondelles
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-green-700 transition-colors">{t('nav.home')}</Link>
          <Link href="/boutique" className="hover:text-green-700 transition-colors">{t('nav.shop')}</Link>
          <Link href="/a-propos" className="hover:text-green-700 transition-colors">{t('nav.about')}</Link>
          {isUserAdmin && (
            <Link href="/admin" className="hover:text-green-700 transition-colors text-red-600">{t('nav.admin')}</Link>
          )}
          <div className="flex items-center gap-1 border border-stone-300 rounded-md overflow-hidden text-xs">
            {(['fr', 'nl', 'en'] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 uppercase font-bold transition-colors ${locale === l ? 'bg-green-700 text-white' : 'hover:bg-stone-100 text-stone-600'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Mon Compte">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('nav.myAccount')}</DropdownMenuLabel>
                <DropdownMenuItem className="text-xs text-stone-500">{user.email}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/mon-compte" className="cursor-pointer">{t('nav.myOrders')}</Link>
                </DropdownMenuItem>
                {isUserAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">Administration</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">{t('nav.signIn')}</Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-600 p-0 text-[10px]">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[400px]">
              <div className="sr-only"><SheetTitle>Votre Panier</SheetTitle></div>
              <Cart />
            </SheetContent>
          </Sheet>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="sr-only"><SheetTitle>Menu</SheetTitle></div>
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium">{t('nav.home')}</Link>
                  <Link href="/boutique" className="text-lg font-medium">{t('nav.shop')}</Link>
                  <Link href="/a-propos" className="text-lg font-medium">{t('nav.about')}</Link>
                  {user ? (
                    <>
                      <Link href="/mon-compte" className="text-lg font-medium">{t('nav.myOrders')}</Link>
                      {isUserAdmin && <Link href="/admin" className="text-lg font-medium">{t('nav.admin')}</Link>}
                      <button onClick={handleSignOut} className="text-lg font-medium text-left text-red-600">{t('nav.signOut')}</button>
                    </>
                  ) : (
                    <Link href="/auth/login" className="text-lg font-medium text-green-700">{t('nav.signIn')}</Link>
                  )}
                  <div className="flex items-center gap-1 border border-stone-300 rounded-md overflow-hidden text-sm w-fit">
                    {(['fr', 'nl', 'en'] as Locale[]).map((l) => (
                      <button key={l} onClick={() => setLocale(l)} className={`px-3 py-1 uppercase font-bold transition-colors ${locale === l ? 'bg-green-700 text-white' : 'hover:bg-stone-100 text-stone-600'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
