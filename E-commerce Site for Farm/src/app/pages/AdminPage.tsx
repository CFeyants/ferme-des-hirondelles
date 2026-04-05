import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/admin';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Plus, Trash, Edit, Download, Package, List } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../data';
import { useForm } from 'react-hook-form';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import * as XLSX from 'xlsx';
import { Checkbox } from '../components/ui/checkbox';

export const AdminPage = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState('');

  if (!isAdmin(user?.email)) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
        <p>Vous n'avez pas les droits d'administration.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/'}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Tableau de bord Producteur</h1>
        <div className="text-sm text-stone-500">
          Connecté en tant que : <span className="font-medium text-stone-900">{user?.email}</span>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
          <TabsTrigger value="products">Produits & Stock</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <OrdersView />
        </TabsContent>

        <TabsContent value="products">
          <ProductsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const OrdersView = () => {
  const { orders, updateOrder } = useStore();

  const handleExport = () => {
    // Format data for Excel
    const dataToExport = orders.map(order => ({
      ID: order.id,
      Date: new Date(order.createdAt).toLocaleDateString('fr-BE'),
      Client: order.customerName,
      Email: order.customerEmail,
      Telephone: order.customerPhone || '',
      Retrait: order.pickupDate,
      Paiement: order.paymentMethod,
      Total: order.total,
      Statut: order.status,
      Prepare: order.isPrepared ? 'Oui' : 'Non',
      Produits: order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Commandes");
    
    // Generate buffer
    XLSX.writeFile(workbook, `commandes-${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Fichier Excel exporté avec succès");
  };

  const togglePrepared = (order: any) => {
    updateOrder({
      ...order,
      isPrepared: !order.isPrepared
    });
  };

  const totalQuantities = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      acc[item.name] = (acc[item.name] || 0) + item.quantity;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des commandes</h2>
        <Button onClick={handleExport} variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Exporter Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Commandes</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-4xl font-bold text-green-700">{orders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
             <CardTitle>À Préparer</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="max-h-40 overflow-y-auto text-sm space-y-1">
               {Object.entries(totalQuantities).map(([name, qty]) => (
                 <div key={name} className="flex justify-between">
                   <span>{name}</span>
                   <span className="font-bold">{qty}</span>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Retrait</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Préparée ?</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-stone-500">
                  Aucune commande pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-xs text-stone-500">{order.customerEmail}</div>
                  </TableCell>
                  <TableCell className="capitalize">{order.pickupDate}</TableCell>
                  <TableCell className="capitalize">{order.paymentMethod}</TableCell>
                  <TableCell>{order.total.toFixed(2)}€</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`prepared-${order.id}`} 
                        checked={order.isPrepared || false}
                        onCheckedChange={() => togglePrepared(order)}
                      />
                      <label 
                        htmlFor={`prepared-${order.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {order.isPrepared ? 'Oui' : 'Non'}
                      </label>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'picked_up' ? 'secondary' : 'default'}>
                      {order.status === 'confirmed' || order.status === 'pending' ? 'À préparer' : 'Terminé'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ProductsView = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Product>();

  const onSubmit = (data: Product) => {
    // Ensure numbers are numbers
    const formattedData = {
      ...data,
      id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
      price: Number(data.price),
      stockQuantity: Number(data.stockQuantity),
      inStock: Number(data.stockQuantity) > 0
    };

    if (editingProduct) {
      updateProduct(formattedData);
    } else {
      addProduct(formattedData);
    }
    setIsDialogOpen(false);
    reset();
    setEditingProduct(null);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('category', product.category);
    setValue('price', product.price);
    setValue('unit', product.unit);
    setValue('stockQuantity', product.stockQuantity);
    setValue('description', product.description);
    setValue('image', product.image);
    setIsDialogOpen(true);
  };

  const startNew = () => {
    setEditingProduct(null);
    reset();
    setIsDialogOpen(true);
  };

  const toggleStock = (product: Product) => {
    updateProduct({ ...product, inStock: !product.inStock });
    toast.success(`Produit ${!product.inStock ? 'mis en stock' : 'retiré du stock'}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gestion des produits</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={startNew} className="bg-green-700 hover:bg-green-800">
              <Plus className="h-4 w-4 mr-2" /> Nouveau Produit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" {...register('name', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select onValueChange={(val: any) => setValue('category', val)} defaultValue={editingProduct?.category || 'viande'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viande">Viande</SelectItem>
                      <SelectItem value="legumes">Légumes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input id="price" type="number" step="0.01" {...register('price', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unité (kg, colis...)</Label>
                  <Input id="unit" {...register('unit', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" {...register('stockQuantity', { required: true })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL Image</Label>
                <Input id="image" {...register('image')} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Input id="desc" {...register('description')} />
              </div>
              <Button type="submit" className="w-full mt-4">Enregistrer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>En Stock</TableHead>
              <TableHead>Stock (Qté)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-3">
                   <img src={product.image} className="w-8 h-8 rounded object-cover" alt="" />
                   {product.name}
                </TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>{product.price.toFixed(2)}€ / {product.unit}</TableCell>
                <TableCell>
                  <Switch 
                    checked={product.inStock} 
                    onCheckedChange={() => toggleStock(product)} 
                  />
                </TableCell>
                <TableCell>
                  <Badge variant={product.stockQuantity > 0 ? 'outline' : 'destructive'}>
                    {product.stockQuantity}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
