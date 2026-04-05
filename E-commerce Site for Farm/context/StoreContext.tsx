'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Product, CartItem, Order, PRODUCTS } from '@/data'
import { toast } from 'sonner'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SERVER_BASE = `${SUPABASE_URL}/functions/v1/make-server-eb0bde5e`

interface StoreContextType {
  products: Product[]
  orders: Order[]
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  lastOrder: Order | null
  setLastOrder: (order: Order | null) => void
  refreshOrders: () => Promise<void>
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  addOrder: (order: Order) => void
  updateOrder: (order: Order) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS)
  const [orders, setOrders] = useState<Order[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${SERVER_BASE}/orders`, {
        headers: { 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
      })
      if (response.ok) {
        const data = await response.json()
        if (data.orders) setOrders(data.orders)
      }
    } catch (error) {
      console.error('Failed to fetch orders', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        toast.success('Quantité mise à jour dans le panier')
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      toast.success('Ajouté au panier')
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
    toast.info('Produit retiré du panier')
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId); return }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item))
  }

  const clearCart = () => setCart([])
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const addProduct = (product: Product) => { setProducts(prev => [...prev, product]); toast.success('Produit ajouté') }
  const updateProduct = (updated: Product) => { setProducts(prev => prev.map(p => p.id === updated.id ? updated : p)); toast.success('Produit mis à jour') }
  const deleteProduct = (productId: string) => { setProducts(prev => prev.filter(p => p.id !== productId)); toast.success('Produit supprimé') }

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev])
    order.items.forEach(item => {
      setProducts(prev => prev.map(p => p.id === item.id
        ? { ...p, stockQuantity: Math.max(0, p.stockQuantity - item.quantity), inStock: p.stockQuantity - item.quantity > 0 }
        : p
      ))
    })
  }

  const updateOrder = async (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o))
    try {
      await fetch(`${SERVER_BASE}/kv-store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ key: `order:${updatedOrder.id}`, value: updatedOrder })
      })
      toast.success('Commande mise à jour')
    } catch (error) {
      console.error('Failed to update order', error)
      toast.error('Erreur lors de la mise à jour de la commande')
    }
  }

  return (
    <StoreContext.Provider value={{
      products, orders, cart, addToCart, removeFromCart, updateCartQuantity,
      clearCart, cartTotal, lastOrder, setLastOrder, refreshOrders: fetchOrders,
      addProduct, updateProduct, deleteProduct, addOrder, updateOrder
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within a StoreProvider')
  return context
}
