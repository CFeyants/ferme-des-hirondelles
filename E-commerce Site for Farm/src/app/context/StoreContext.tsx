import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, Order, PRODUCTS, MOCK_ORDERS } from '../data';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  refreshOrders: () => Promise<void>;
  
  // Admin functions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-eb0bde5e/orders`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success("Quantité mise à jour dans le panier");
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      toast.success("Ajouté au panier");
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.info("Produit retiré du panier");
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Admin Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    toast.success("Produit ajouté");
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    toast.success("Produit mis à jour");
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast.success("Produit supprimé");
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    // Also update stock
    order.items.forEach(item => {
      setProducts(prevProducts => 
        prevProducts.map(p => {
          if (p.id === item.id) {
            return {
              ...p,
              stockQuantity: Math.max(0, p.stockQuantity - item.quantity),
              inStock: p.stockQuantity - item.quantity > 0
            };
          }
          return p;
        })
      );
    });
  };

  const updateOrder = async (updatedOrder: Order) => {
    // Optimistic update
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    
    try {
      // Sync with server
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-eb0bde5e/kv-store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          key: `order:${updatedOrder.id}`,
          value: updatedOrder
        })
      });
      toast.success("Commande mise à jour");
    } catch (error) {
      console.error("Failed to update order", error);
      toast.error("Erreur lors de la mise à jour de la commande");
      // Revert if needed, but for now keep optimistic
    }
  };

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      refreshOrders: fetchOrders,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};
