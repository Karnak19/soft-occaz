import { UsersPaymentOptions } from '$/utils/pocketbase/pocketbase-types';

// Helper functions to get human-readable payment and shipping methods
export const getPaymentMethodLabel = (method?: UsersPaymentOptions) => {
  switch (method) {
    case UsersPaymentOptions.paypal:
      return 'PayPal';
    case UsersPaymentOptions.cash:
      return 'Espèces';
    case UsersPaymentOptions.bank_transfer:
      return 'Virement bancaire';
    case UsersPaymentOptions.lydia:
      return 'Lydia';
    default:
      return null;
  }
};
