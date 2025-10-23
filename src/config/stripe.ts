export const STRIPE_CONFIG = {
    publishableKey: 'pk_test_TU_PUBLISHABLE_KEY', // Reemplazar con tu key
    prices: {
      monthly: {
        id: 'price_MONTHLY_ID',
        amount: 29.99,
        interval: 'mes'
      },
      yearly: {
        id: 'price_YEARLY_ID',
        amount: 249.99,
        interval: 'año',
        discount: '30% OFF'
      },
      lifetime: {
        id: 'price_LIFETIME_ID',
        amount: 499.99,
        interval: 'pago único'
      }
    }
  };