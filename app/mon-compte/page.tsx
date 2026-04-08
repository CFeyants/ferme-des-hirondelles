'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useStore } from '@/context/StoreContext'
import { useRouter } from 'next/navigation'
import { Order, CartItem } from '@/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, ShoppingBasket, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: 'En attente',  color: 'bg-yellow-100 text-yellow-800' },
  confirmed:  { label: 'Confirmée',   color: 'bg-blue-100 text-blue-800' },
  picked_up:  { label: 'Retirée',     color: 'bg-green-100 text-green-800' },
  cancelled:  { label: 'Annulée',     color: 'bg-red-100 text-red-800' },
}

export default function MonComptePage() {
  const { user, loading: authLoading } = useAuth()
  const { products, addToCart, clearCart } = useStore()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth/login?from=/mon-compte')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/make-server-eb0bde5e/orders`, {
          headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        const myOrders: Order[] = (data.orders ?? [])
          .filter((o: Order) => o.customerEmail === user.email)
          .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setOrders(myOrders)
      } catch {
        toast.error('Impossible de charger vos commandes.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  const canReorder = (items: CartItem[]) =>
    items.every(item => {
      const product = products.find(p => p.id === item.id)
      return product && product.inStock && product.stockQuantity > 0
    })

  const handleReorder = (items: CartItem[]) => {
    clearCart()
    items.forEach(item => {
      const product = products.find(p => p.id === item.id)
      if (product) addToCart(product, item.quantity)
    })
    toast.success('Produits ajoutés au panier !')
    router.push('/boutique')
  }

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Mon Compte</h1>
        <p className="text-stone-500 mt-1">{user?.email}</p>
      </div>

      <h2 className="text-xl font-bold mb-6 text-stone-800">Historique des commandes</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-xl border border-dashed border-stone-200">
          <ShoppingBasket className="h-12 w-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500 text-lg">Vous n'avez pas encore de commande.</p>
          <Button onClick={() => router.push('/boutique')} className="mt-4 bg-green-600 hover:bg-green-700">
            Découvrir la boutique
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const available = canReorder(order.items)
            const status = STATUS_LABELS[order.status] ?? { label: order.status, color: 'bg-stone-100 text-stone-700' }
            return (
              <div key={order.id} className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 bg-stone-50 border-b border-stone-200">
                  <div className="space-y-1">
                    <p className="font-mono font-bold text-stone-900">{order.id}</p>
                    <p className="text-sm text-stone-500">
                      {format(new Date(order.createdAt), 'd MMMM yyyy', { locale: fr })}
                      {' · '}Retrait {order.pickupDate === 'vendredi' ? 'vendredi soir' : 'samedi'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="font-bold text-stone-900">{order.total.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-2 mb-5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm text-stone-700">
                        <span>{item.quantity}× {item.name}</span>
                        <span className="font-mono">{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>

                  {available ? (
                    <Button
                      onClick={() => handleReorder(order.items)}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refaire cette commande
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-stone-400">
                      <AlertTriangle className="h-4 w-4" />
                      Certains produits ne sont plus disponibles
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
