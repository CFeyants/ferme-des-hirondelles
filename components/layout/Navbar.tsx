'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, User, Tractor, LogOut } from 'lucide-react'
import { Button } from '@/src/app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/src/app/components/ui/sheet'
import { Badge } from '@/src/app/components/ui/badge'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/src/app/components/ui/dropdown-menu'
import { useStore } from '@/context/StoreContext'
import { useAuth } from '@/context/AuthContext'
import { Cart } from '@/components/shop/Cart'
import { isAdmin } from '@/utils/admin'

export const Navbar = () => {
  const { cart } = useStore()
  const { user, signOut } = useAuth()
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
          <Link href="/" className="hover:text-green-700 transition-colors">Accueil</Link>
          <Link href="/boutique" className="hover:text-green-700 transition-colors">Boutique</Link>
          <Link href="/a-propos" className="hover:text-green-700 transition-colors">À Propos</Link>
          {isUserAdmin && (
            <Link href="/admin" className="hover:text-green-700 transition-colors text-red-600">Administration</Link>
          )}
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
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuItem className="text-xs text-stone-500">{user.email}</DropdownMenuItem>
                <DropdownMenuSeparator />
                {isUserAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">Administration</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">Connexion</Button>
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
                  <Link href="/" className="text-lg font-medium">Accueil</Link>
                  <Link href="/boutique" className="text-lg font-medium">Boutique</Link>
                  <Link href="/a-propos" className="text-lg font-medium">À Propos</Link>
                  {user ? (
                    <>
                      {isUserAdmin && <Link href="/admin" className="text-lg font-medium">Administration</Link>}
                      <button onClick={handleSignOut} className="text-lg font-medium text-left text-red-600">Déconnexion</button>
                    </>
                  ) : (
                    <Link href="/auth/login" className="text-lg font-medium text-green-700">Connexion</Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
