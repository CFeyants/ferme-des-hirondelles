import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SheetClose } from '../ui/sheet';
import { Separator } from '../ui/separator';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/paiement');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-stone-500">
        <ShoppingBag className="h-12 w-12 opacity-20" />
        <p className="text-lg font-medium">Votre panier est vide</p>
        <SheetClose asChild>
          <Button variant="outline">Continuer vos achats</Button>
        </SheetClose>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="py-6">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Votre Panier</h2>
        <p className="text-sm text-stone-500">{cart.length} articles</p>
      </div>
      
      <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-stone-200">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-medium text-stone-900">{item.name}</h3>
                  <p className="text-sm text-stone-500">{item.price.toFixed(2)}€ / {item.unit}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 border rounded-md p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="pt-6 space-y-4">
        <Separator />
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>{cartTotal.toFixed(2)}€</span>
        </div>
        <p className="text-xs text-stone-500 text-center">
          Paiement sécurisé lors de la validation.
          <br/>Retrait vendredi soir ou samedi.
        </p>
        <SheetClose asChild>
          <Button 
            className="w-full bg-green-700 hover:bg-green-800 text-white py-6 text-lg"
            onClick={handleCheckout}
          >
            Passer commande
          </Button>
        </SheetClose>
      </div>
    </div>
  );
};
