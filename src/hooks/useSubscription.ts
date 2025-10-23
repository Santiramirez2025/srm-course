import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

interface Subscription {
  status: 'active' | 'inactive' | 'trial' | 'expired';
  plan: 'free' | 'monthly' | 'yearly' | 'lifetime';
  expiresAt?: string;
  hasAccess: boolean;
}

export const useSubscription = (userId?: string) => {
  const [subscription, setSubscription] = useState<Subscription>({
    status: 'inactive',
    plan: 'free',
    hasAccess: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    // TODO: Llamar a tu backend/Firebase para verificar suscripción
    checkSubscription(userId);
  }, [userId]);

  const checkSubscription = async (uid: string) => {
    try {
      // Verificar en localStorage primero (para pruebas)
      const saved = localStorage.getItem(`subscription_${uid}`);
      if (saved) {
        const data = JSON.parse(saved) as Subscription;
        setSubscription(data);
      } else {
        // Usuario nuevo - ofrecer trial de 7 días
        setSubscription({
          status: 'trial',
          plan: 'free',
          hasAccess: true,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const activateSubscription = (plan: 'monthly' | 'yearly' | 'lifetime') => {
    if (!userId) return;

    const newSubscription: Subscription = {
      status: 'active',
      plan,
      hasAccess: true,
      expiresAt: plan === 'lifetime' 
        ? undefined 
        : new Date(Date.now() + (plan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString()
    };

    localStorage.setItem(`subscription_${userId}`, JSON.stringify(newSubscription));
    setSubscription(newSubscription);
  };

  return {
    subscription,
    loading,
    activateSubscription,
    hasAccess: subscription.hasAccess
  };
};