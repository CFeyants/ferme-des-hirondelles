'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react'
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

const NAV_LINKS = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/boutique', labelKey: 'nav.shop' },
  { href: '/recettes', labelKey: 'nav.recipes' },
  { href: '/a-propos', labelKey: 'nav.about' },
]

const LOCALES: Locale[] = ['fr', 'nl', 'en']

interface PillState { left: number; width: number; ready: boolean }

export const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useStore()
  const { user, signOut } = useAuth()
  const { locale, setLocale, t } = useLanguage()
  const isUserAdmin = isAdmin(user?.email)
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)

  // Nav pill
  const navContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [navPill, setNavPill] = useState<PillState>({ left: 0, width: 0, ready: false })

  // Locale pill
  const localeContainerRef = useRef<HTMLDivElement>(null)
  const localeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [localePill, setLocalePill] = useState<PillState>({ left: 0, width: 0, ready: false })

  const updateNavPill = useCallback(() => {
    const container = navContainerRef.current
    if (!container) return
    const activeIdx = NAV_LINKS.findIndex(({ href }) =>
      href === '/' ? pathname === '/' : pathname.startsWith(href)
    )
    const el = linkRefs.current[activeIdx]
    if (!el) return
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setNavPill({ left: eRect.left - cRect.left, width: eRect.width, ready: true })
  }, [pathname])

  const updateLocalePill = useCallback(() => {
    const container = localeContainerRef.current
    if (!container) return
    const idx = LOCALES.indexOf(locale)
    const el = localeRefs.current[idx]
    if (!el) return
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    setLocalePill({ left: eRect.left - cRect.left, width: eRect.width, ready: true })
  }, [locale])

  useEffect(() => { updateNavPill() }, [updateNavPill])
  useEffect(() => { updateLocalePill() }, [updateLocalePill])

  useEffect(() => {
    const onResize = () => { updateNavPill(); updateLocalePill() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [updateNavPill, updateLocalePill])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white"
      style={{ borderBottom: '0.5px solid #e5e7eb', height: '60px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12L12 3L21 12" stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 10V20H10V15H14V20H19V10" stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-serif text-[#1a2e17] text-[15px] tracking-tight leading-none hidden sm:block">
            Ferme des Hirondelles
          </span>
        </Link>

        {/* ── Nav links (desktop) ── */}
        <div
          ref={navContainerRef}
          className="hidden md:flex relative items-center rounded-full p-1 gap-0.5"
          style={{ backgroundColor: '#f0f5ee' }}
        >
          {/* Sliding white pill */}
          {navPill.ready && (
            <span
              aria-hidden
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm pointer-events-none"
              style={{
                left: navPill.left,
                width: navPill.width,
                transition: 'left 250ms cubic-bezier(0.4,0,0.2,1), width 250ms cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          )}
          {NAV_LINKS.map(({ href, labelKey }, idx) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                ref={(el: HTMLAnchorElement | null) => { linkRefs.current[idx] = el }}
                className={`relative z-10 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                  active ? 'text-[#3B6D11]' : 'text-stone-500 hover:text-[#3B6D11]'
                }`}
              >
                {t(labelKey)}
              </Link>
            )
          })}
        </div>

        {/* ── Right side ── */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Language selector (desktop) */}
          <div
            ref={localeContainerRef}
            className="hidden md:flex relative items-center rounded-full p-0.5"
            style={{ backgroundColor: '#f0f5ee' }}
          >
            {localePill.ready && (
              <span
                aria-hidden
                className="absolute top-0.5 bottom-0.5 rounded-full pointer-events-none"
                style={{
                  left: localePill.left,
                  width: localePill.width,
                  backgroundColor: '#3B6D11',
                  transition: 'left 250ms cubic-bezier(0.4,0,0.2,1), width 250ms cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            )}
            {LOCALES.map((l, idx) => (
              <button
                key={l}
                ref={(el: HTMLButtonElement | null) => { localeRefs.current[idx] = el }}
                onClick={() => setLocale(l)}
                className={`relative z-10 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide transition-colors duration-150 ${
                  locale === l ? 'text-white' : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-4 bg-stone-200 mx-1" />

          {/* User menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-stone-100">
                  <User className="h-4 w-4 text-stone-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-stone-500 truncate">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/mon-compte" className="cursor-pointer">{t('nav.myOrders')}</Link>
                </DropdownMenuItem>
                {isUserAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer text-red-600">{t('nav.admin')}</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-3.5 w-3.5" />{t('nav.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="hidden md:block">
              <Button variant="ghost" size="sm" className="h-8 px-3 text-sm rounded-full text-stone-600 hover:bg-stone-100 gap-1.5">
                <User className="h-3.5 w-3.5" />{t('nav.signIn')}
              </Button>
            </Link>
          )}

          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full hover:bg-stone-100">
                <ShoppingCart className="h-4 w-4 text-stone-600" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center rounded-full text-[9px] font-bold border-0"
                    style={{ backgroundColor: '#3B6D11', color: 'white' }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[400px]">
              <div className="sr-only"><SheetTitle>Votre Panier</SheetTitle></div>
              <Cart />
            </SheetContent>
          </Sheet>

          {/* Hamburger (mobile) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-stone-100">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col gap-1 mt-4">
                  {NAV_LINKS.map(({ href, labelKey }) => {
                    const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                          active
                            ? 'bg-[#edf4eb] text-[#3B6D11]'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {t(labelKey)}
                      </Link>
                    )
                  })}

                  <div className="my-3 h-px bg-stone-100" />

                  {user ? (
                    <>
                      <Link href="/mon-compte" className="px-4 py-2.5 rounded-xl text-base font-medium text-stone-700 hover:bg-stone-50">
                        {t('nav.myOrders')}
                      </Link>
                      {isUserAdmin && (
                        <Link href="/admin" className="px-4 py-2.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50">
                          {t('nav.admin')}
                        </Link>
                      )}
                      <button onClick={handleSignOut} className="px-4 py-2.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 text-left w-full">
                        {t('nav.signOut')}
                      </button>
                    </>
                  ) : (
                    <Link href="/auth/login" className="px-4 py-2.5 rounded-xl text-base font-medium text-[#3B6D11] hover:bg-[#edf4eb]">
                      {t('nav.signIn')}
                    </Link>
                  )}

                  <div className="my-3 h-px bg-stone-100" />

                  {/* Locale selector (mobile) */}
                  <div className="flex gap-2 px-1">
                    {LOCALES.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLocale(l)}
                        className="flex-1 py-2 rounded-lg text-sm font-bold uppercase transition-colors"
                        style={
                          locale === l
                            ? { backgroundColor: '#3B6D11', color: 'white' }
                            : { backgroundColor: '#f0f5ee', color: '#6b7280' }
                        }
                      >
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
