'use client'

import React, { useState } from 'react'
import { useStore } from '@/context/StoreContext'
import { useAuth } from '@/context/AuthContext'
import { isAdmin } from '@/utils/admin'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash, Edit, Download, CheckCheck, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Product } from '@/data'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import * as XLSX from 'xlsx'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!isAdmin(user?.email)) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
        <p>Vous n'avez pas les droits d'administration.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push('/')}>Retour à l'accueil</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Tableau de bord Producteur</h1>
        <div className="text-sm text-stone-500">Connecté : <span className="font-medium text-stone-900">{user?.email}</span></div>
      </div>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
          <TabsTrigger value="products">Produits & Stock</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
        </TabsList>
        <TabsContent value="orders"><OrdersView /></TabsContent>
        <TabsContent value="products"><ProductsView /></TabsContent>
      </Tabs>
    </div>
  )
}

function formatWeight(kg: number): string {
  const grams = Math.round(kg * 1000)
  if (grams < 1000) return `${grams} g`
  const kgVal = grams / 1000
  if (kgVal % 1 === 0) return `${kgVal} kg`
  return `${kgVal.toFixed(3).replace(/\.?0+$/, '').replace('.', ',')} kg`
}

const OrdersView = () => {
  const { orders, updateOrder } = useStore()
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())

  const toggleSelect = (id: string) => {
    setSelectedOrders(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const allSelected = orders.length > 0 && selectedOrders.size === orders.length
  const toggleSelectAll = () => {
    setSelectedOrders(allSelected ? new Set() : new Set(orders.map(o => o.id)))
  }

  const markSelectedPrepared = () => {
    const toMark = orders.filter(o => selectedOrders.has(o.id) && !o.isPrepared)
    toMark.forEach(o => updateOrder({ ...o, isPrepared: true, status: 'confirmed' }))
    setSelectedOrders(new Set())
    toast.success(`${toMark.length} commande(s) marquée(s) comme préparée(s)`)
  }

  const handleExport = () => {
    const data = orders.map(o => ({
      ID: o.id, Date: new Date(o.createdAt).toLocaleDateString('fr-BE'),
      Client: o.customerName, Email: o.customerEmail, Telephone: o.customerPhone || '',
      Retrait: o.pickupDate, Paiement: o.paymentMethod, Total: o.total,
      Statut: o.status, Prepare: o.isPrepared ? 'Oui' : 'Non',
      Produits: o.items.map(i => `${i.unit === 'kg' ? formatWeight(i.quantity) : i.quantity + 'x'} ${i.name}`).join(', ')
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Commandes')
    XLSX.writeFile(wb, `commandes-${new Date().toISOString().split('T')[0]}.xlsx`)
    toast.success('Fichier Excel exporté')
  }

  const totalQty = orders.reduce((acc, o) => {
    o.items.forEach(i => {
      if (!acc[i.name]) acc[i.name] = { qty: 0, unit: i.unit }
      acc[i.name].qty += i.quantity
    })
    return acc
  }, {} as Record<string, { qty: number; unit: string }>)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h2 className="text-xl font-bold">Liste des commandes</h2>
        <div className="flex flex-wrap gap-2">
          {selectedOrders.size > 0 && (
            <Button
              onClick={markSelectedPrepared}
              className="gap-2 bg-green-700 hover:bg-green-800 text-white"
            >
              <CheckCheck className="h-4 w-4" /> Marquer sélection comme préparée ({selectedOrders.size})
            </Button>
          )}
          <Button
            onClick={() => {
              orders.filter(o => !o.isPrepared).forEach(o => updateOrder({ ...o, isPrepared: true, status: 'confirmed' }))
              toast.success('Toutes les commandes marquées comme préparées')
            }}
            variant="outline"
            className="gap-2 border-green-600 text-green-700 hover:bg-green-50"
          >
            <CheckCheck className="h-4 w-4" /> Tout marquer comme préparé
          </Button>
          <Button onClick={handleExport} variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Exporter Excel
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle>Total Commandes</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold text-green-700">{orders.length}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>À Préparer</CardTitle></CardHeader><CardContent>
          <div className="max-h-40 overflow-y-auto text-sm space-y-1">
            {Object.entries(totalQty).map(([name, { qty, unit }]) => (
              <div key={name} className="flex justify-between">
                <span>{name}</span>
                <span className="font-bold">{unit === 'kg' ? formatWeight(qty) : `${qty} × ${unit}`}</span>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} aria-label="Tout sélectionner" />
              </TableHead>
              <TableHead>ID</TableHead><TableHead>Client</TableHead><TableHead>Retrait</TableHead>
              <TableHead>Paiement</TableHead><TableHead>Total</TableHead><TableHead>Préparée ?</TableHead><TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-stone-500">Aucune commande.</TableCell></TableRow>
            ) : orders.map(order => (
              <TableRow key={order.id} className={selectedOrders.has(order.id) ? 'bg-green-50' : ''}>
                <TableCell>
                  <Checkbox checked={selectedOrders.has(order.id)} onCheckedChange={() => toggleSelect(order.id)} aria-label={`Sélectionner ${order.id}`} />
                </TableCell>
                <TableCell className="font-mono">{order.id}</TableCell>
                <TableCell><div className="font-medium">{order.customerName}</div><div className="text-xs text-stone-500">{order.customerEmail}</div></TableCell>
                <TableCell className="capitalize">{order.pickupDate}</TableCell>
                <TableCell className="capitalize">{order.paymentMethod}</TableCell>
                <TableCell>{order.total.toFixed(2)}€</TableCell>
                <TableCell>
                  {order.isPrepared ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      <Check className="h-3 w-3" /> Préparée
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 text-xs h-7"
                      onClick={() => updateOrder({ ...order, isPrepared: true, status: 'confirmed' })}
                    >
                      ✅ Valider la préparation
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={
                    order.status === 'picked_up' ? 'bg-stone-200 text-stone-700' :
                    order.isPrepared ? 'bg-green-100 text-green-800 border border-green-300' :
                    'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  }>
                    {order.status === 'picked_up' ? 'Terminée' : order.isPrepared ? 'Préparée' : 'À préparer'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const ProductsView = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { register, handleSubmit, reset, setValue } = useForm<Product>()

  const onSubmit = (data: Product) => {
    const formatted = { ...data, id: editingProduct ? editingProduct.id : Math.random().toString(36).substring(2, 11), price: Number(data.price), stockQuantity: Number(data.stockQuantity), inStock: Number(data.stockQuantity) > 0 }
    editingProduct ? updateProduct(formatted) : addProduct(formatted)
    setIsDialogOpen(false); reset(); setEditingProduct(null)
  }

  const startEdit = (p: Product) => {
    setEditingProduct(p)
    setValue('name', p.name); setValue('category', p.category); setValue('price', p.price)
    setValue('unit', p.unit); setValue('stockQuantity', p.stockQuantity); setValue('description', p.description); setValue('image', p.image)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gestion des produits</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProduct(null); reset(); setIsDialogOpen(true) }} className="bg-green-700 hover:bg-green-800">
              <Plus className="h-4 w-4 mr-2" /> Nouveau Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader><DialogTitle>{editingProduct ? 'Modifier' : 'Ajouter'} un produit</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nom</Label><Input {...register('name', { required: true })} /></div>
                <div className="space-y-2"><Label>Catégorie</Label>
                  <Select onValueChange={(val: any) => setValue('category', val)} defaultValue={editingProduct?.category || 'viande'}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="viande">Viande</SelectItem><SelectItem value="legumes">Légumes</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Prix (€)</Label><Input type="number" step="0.01" {...register('price', { required: true })} /></div>
                <div className="space-y-2"><Label>Unité</Label><Input {...register('unit', { required: true })} /></div>
                <div className="space-y-2"><Label>Stock</Label><Input type="number" {...register('stockQuantity', { required: true })} /></div>
              </div>
              <div className="space-y-2"><Label>URL Image</Label><Input {...register('image')} placeholder="https://..." /></div>
              <div className="space-y-2"><Label>Description</Label><Input {...register('description')} /></div>
              <Button type="submit" className="w-full">Enregistrer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader><TableRow><TableHead>Produit</TableHead><TableHead>Catégorie</TableHead><TableHead>Prix</TableHead><TableHead>En Stock</TableHead><TableHead>Qté</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {products.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium flex items-center gap-3"><img src={p.image} className="w-8 h-8 rounded object-cover" alt="" />{p.name}</TableCell>
                <TableCell className="capitalize">{p.category}</TableCell>
                <TableCell>{p.price.toFixed(2)}€ / {p.unit}</TableCell>
                <TableCell><Switch checked={p.inStock} onCheckedChange={() => updateProduct({ ...p, inStock: !p.inStock })} /></TableCell>
                <TableCell><Badge variant={p.stockQuantity > 0 ? 'outline' : 'destructive'}>{p.stockQuantity}</Badge></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700"><Trash className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
