import { useState, useEffect } from 'react';

interface Subscription {
  status: 'active' | 'inactive' | 'expired';
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

    checkSubscription(userId);
  }, [userId]);

  const checkSubscription = async (uid: string) => {
    try {
      // Verificar en localStorage
      const saved = localStorage.getItem(`subscription_${uid}`);
      if (saved) {
        const data = JSON.parse(saved) as Subscription;
        
        // Verificar si la suscripción expiró
        if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
          // Suscripción expirada
          setSubscription({
            status: 'expired',
            plan: 'free',
            hasAccess: false
          });
        } else {
          setSubscription(data);
        }
      } else {
        // Usuario nuevo sin suscripción
        setSubscription({
          status: 'inactive',
          plan: 'free',
          hasAccess: false
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({
        status: 'inactive',
        plan: 'free',
        hasAccess: false
      });
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