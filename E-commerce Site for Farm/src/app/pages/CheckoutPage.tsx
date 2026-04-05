import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Separator } from '../components/ui/separator';
import { CreditCard, Landmark, Check, ArrowRight } from 'lucide-react';
import { isShopOpen } from '../data';
import { v4 as uuidv4 } from 'uuid'; // I don't have uuid package, I'll use simple random string

import { supabase } from '../utils/supabaseClient';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const generateId = () => Math.random().toString(36).substr(2, 9);

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupDay: string;
  paymentMethod: 'card' | 'transfer' | 'wero';
}

export const CheckoutPage = () => {
  const { cart, cartTotal, addOrder, clearCart } = useStore();
  const navigate = useNavigate();
  const shopStatus = isShopOpen();
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CheckoutForm>({
    defaultValues: {
      paymentMethod: 'card'
    }
  });

  // Pre-fill form with user data if logged in
  React.useEffect(() => {
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (user.user_metadata?.first_name) setValue('firstName', user.user_metadata.first_name);
        if (user.user_metadata?.last_name) setValue('lastName', user.user_metadata.last_name);
        if (user.email) setValue('email', user.email);
        if (user.user_metadata?.phone) setValue('phone', user.user_metadata.phone);
      }
    };
    loadUserData();
  }, [setValue]);

  const paymentMethod = watch('paymentMethod');

  const depositAmount = cartTotal > 0 ? Math.min(cartTotal, Math.ceil(cartTotal / 50) * 10) : 0;
  const remainingBalance = cartTotal - depositAmount;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <Button onClick={() => navigate('/boutique')}>Retour à la boutique</Button>
      </div>
    );
  }

  // If shop is closed for orders (Friday/Saturday), show warning but maybe allow for next week?
  // The prompt says: "Une fois la deadline dépassée : les commandes sont bloquées automatiquement"
  // So I should block checkout if shop is closed.
  if (!shopStatus.isOpen) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Commandes fermées</h2>
        <p className="mb-6">{shopStatus.message}</p>
        <p>Les commandes rouvriront dimanche.</p>
        <Button onClick={() => navigate('/')} variant="outline" className="mt-4">Retour à l'accueil</Button>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    try {
      const orderId = `CMD-${generateId().toUpperCase()}`;
      const newOrder = {
        id: orderId,
        customerName: `${data.firstName} ${data.lastName}`,
        customerEmail: data.email,
        customerPhone: data.phone,
        items: [...cart],
        total: cartTotal,
        deposit: depositAmount,
        remainingBalance: remainingBalance,
        status: 'pending' as const,
        pickupDate: data.pickupDay,
        paymentMethod: data.paymentMethod,
        createdAt: new Date().toISOString()
      };

      // Save to Supabase KV Store using Server Proxy (to bypass RLS)
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-eb0bde5e/kv-store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          key: `order:${orderId}`,
          value: newOrder
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save order');
      }

      // Update local state
      addOrder(newOrder);
      clearCart();
      toast.success("Commande validée avec succès !");
      navigate('/confirmation', { state: { order: newOrder } });
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Erreur lors de la validation de la commande. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Finaliser ma commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* 1. Coordonnées */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Coordonnées
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" {...register('firstName', { required: true })} placeholder="Jean" />
                  {errors.firstName && <span className="text-red-500 text-xs">Requis</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" {...register('lastName', { required: true })} placeholder="Dupont" />
                  {errors.lastName && <span className="text-red-500 text-xs">Requis</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email', { required: true })} placeholder="jean@example.com" />
                  {errors.email && <span className="text-red-500 text-xs">Requis</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" {...register('phone', { required: true })} placeholder="0470 12 34 56" />
                  {errors.phone && <span className="text-red-500 text-xs">Requis</span>}
                </div>
              </div>
            </div>

            {/* 2. Retrait */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                Moment du retrait
              </h2>
              <p className="text-sm text-stone-500 mb-4">
                Adresse : Ferme des Hirondelles, 33 rue du Moulin, 1950 Crainhem
              </p>
              
              <RadioGroup 
                defaultValue="vendredi" 
                onValueChange={(val) => setValue('pickupDay', val)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="vendredi" id="r-vendredi" className="peer sr-only" />
                  <Label 
                    htmlFor="r-vendredi" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-green-600 cursor-pointer transition-all"
                  >
                    <span className="font-bold text-lg">Vendredi Soir</span>
                    <span className="text-sm text-stone-500">17h00 - 19h30</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="samedi" id="r-samedi" className="peer sr-only" />
                  <Label 
                    htmlFor="r-samedi" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-green-600 cursor-pointer transition-all"
                  >
                    <span className="font-bold text-lg">Samedi Journée</span>
                    <span className="text-sm text-stone-500">10h00 - 16h00</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 3. Paiement */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-green-100 text-green-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                Acompte de réservation
              </h2>
              <div className="mb-6 bg-yellow-50 p-4 rounded-md border border-yellow-200 text-sm text-stone-700">
                <p className="font-bold mb-1">Politique d'acompte :</p>
                <p>
                  Un acompte de <strong>10€ par tranche de 50€ d'achat</strong> est demandé pour valider votre commande.
                  Le solde sera à régler lors du retrait en magasin.
                </p>
              </div>

              <RadioGroup 
                defaultValue="card" 
                onValueChange={(val: any) => setValue('paymentMethod', val)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 has-[button[data-state=checked]]:border-green-600 has-[button[data-state=checked]]:bg-green-50">
                  <RadioGroupItem value="card" id="pm-card" />
                  <Label htmlFor="pm-card" className="flex items-center gap-3 cursor-pointer w-full">
                    <CreditCard className="h-5 w-5 text-stone-600" />
                    <div className="flex flex-col">
                      <span className="font-medium">Carte Bancaire</span>
                      <span className="text-xs text-stone-500">Bancontact, Visa, Mastercard</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 has-[button[data-state=checked]]:border-green-600 has-[button[data-state=checked]]:bg-green-50">
                  <RadioGroupItem value="wero" id="pm-wero" />
                  <Label htmlFor="pm-wero" className="flex items-center gap-3 cursor-pointer w-full">
                    <div className="font-bold text-blue-600 bg-blue-50 px-2 rounded">W</div>
                    <div className="flex flex-col">
                      <span className="font-medium">Wero (Paiement Mobile)</span>
                      <span className="text-xs text-stone-500">Rapide et sécurisé via votre app bancaire</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4 has-[button[data-state=checked]]:border-green-600 has-[button[data-state=checked]]:bg-green-50">
                  <RadioGroupItem value="transfer" id="pm-transfer" />
                  <Label htmlFor="pm-transfer" className="flex items-center gap-3 cursor-pointer w-full">
                    <Landmark className="h-5 w-5 text-stone-600" />
                    <div className="flex flex-col">
                      <span className="font-medium">Virement Bancaire</span>
                      <span className="text-xs text-stone-500">Preuve de paiement requise avant retrait</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

          </form>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 sticky top-24">
            <h3 className="text-lg font-bold mb-4">Récapitulatif</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-stone-600">
                <span>Total panier</span>
                <span>{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center text-green-700 font-bold bg-green-50 p-2 rounded">
                <span>Acompte à payer</span>
                <span>{depositAmount.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 text-sm">
                <span>Solde en magasin</span>
                <span>{remainingBalance.toFixed(2)}€</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                form="checkout-form"
                type="submit" 
                className="w-full bg-green-700 hover:bg-green-800 py-6 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? 'Traitement...' : `Payer l'acompte (${depositAmount.toFixed(2)}€)`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
