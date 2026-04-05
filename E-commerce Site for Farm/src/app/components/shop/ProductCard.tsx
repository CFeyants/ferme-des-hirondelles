import React, { useState } from 'react';
import { Product } from '../../data';
import { useStore } from '../../context/StoreContext';
import { Button } from '../ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wider transform -rotate-12">
              Épuisé
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded-sm">
            {product.category}
          </span>
          <span className="font-bold text-lg text-stone-900">
            {product.price.toFixed(2)}€ <span className="text-sm font-normal text-stone-500">/ {product.unit}</span>
          </span>
        </div>

        <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
        <p className="text-stone-600 text-sm mb-6 flex-1 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center gap-3 mt-auto">
          {product.inStock ? (
            <>
               {/* Quantity Select (Simple) */}
               <div className="flex items-center border border-stone-300 rounded-md">
                 <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-stone-100 text-stone-600"
                 >
                   -
                 </button>
                 <span className="w-8 text-center font-medium">{quantity}</span>
                 <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-stone-100 text-stone-600"
                 >
                   +
                 </button>
               </div>

               <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white"
               >
                 <ShoppingCart className="mr-2 h-4 w-4" />
                 Ajouter
               </Button>
            </>
          ) : (
            <Button disabled className="w-full bg-stone-100 text-stone-400 border border-stone-200">
              Indisponible
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
