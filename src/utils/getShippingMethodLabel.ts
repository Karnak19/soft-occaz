import { UsersShippingOptions } from '$/utils/pocketbase/pocketbase-types';

export const getShippingMethodLabel = (method?: UsersShippingOptions) => {
  switch (method) {
    case UsersShippingOptions.in_hand:
      return 'En main propre';
    case UsersShippingOptions.colissimo:
      return 'Colissimo';
    case UsersShippingOptions.mondial_relay:
      return 'Mondial Relay';
    default:
      return null;
  }
};
