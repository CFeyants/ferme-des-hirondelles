import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, ShieldAlert } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/boutique';
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('Email ou mot de passe incorrect.');
        }
        throw error;
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminReset = async () => {
    if (!confirm("Voulez-vous vraiment réinitialiser les mots de passe administrateurs (Cédric & François) à '123456' ?")) return;
    
    setIsResetting(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-eb0bde5e/admin/reset-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur inconnue');
      }
      
      toast.success("Mots de passe administrateurs réinitialisés à '123456'");
    } catch (err: any) {
      toast.error(`Erreur: ${err.message}`);
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif font-bold text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nom@exemple.com" 
                {...register('email')} 
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link to="/mot-de-passe-oublie" className="text-xs text-stone-500 hover:text-green-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register('password')} 
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Se connecter
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-stone-500">
          <div>
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-green-600 font-medium hover:underline">
              Créer un compte
            </Link>
          </div>
          
          <div className="w-full pt-4 border-t mt-4">
             <Button 
               variant="outline" 
               className="w-full text-xs text-stone-400 border-dashed" 
               onClick={handleAdminReset}
               disabled={isResetting}
             >
               {isResetting ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <ShieldAlert className="mr-2 h-3 w-3" />}
               Réinitialiser Admin (Urgence)
             </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
