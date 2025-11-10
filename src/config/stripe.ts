// Configuración de Stripe desde variables de entorno
export const STRIPE_CONFIG = {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    prices: {
      monthly: {
        id: import.meta.env.VITE_STRIPE_PRICE_MONTHLY || 'price_MONTHLY_ID',
        amount: 29.99,
        interval: 'mes'
      },
      yearly: {
        id: import.meta.env.VITE_STRIPE_PRICE_YEARLY || 'price_YEARLY_ID',
        amount: 249.99,
        interval: 'año',
        discount: '30% OFF'
      },
      lifetime: {
        id: import.meta.env.VITE_STRIPE_PRICE_LIFETIME || 'price_LIFETIME_ID',
        amount: 499.99,
        interval: 'pago único'
      }
    }
};

// Validar que Stripe esté configurado
if (!STRIPE_CONFIG.publishableKey || STRIPE_CONFIG.publishableKey === 'pk_test_TU_PUBLISHABLE_KEY') {
    console.warn(
        '⚠️ Stripe no está configurado correctamente.\n' +
        'Por favor copia .env.example a .env y añade tu clave pública de Stripe.\n' +
        'Documentación: https://dashboard.stripe.com/apikeys'
    );
}